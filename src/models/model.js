import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { layerTypes } from "../utils";
/**
 * Write models as a function overhere.
 * Hardcode parameters as variables here for now and use.
 * These parameters will be passed later on as arguments.
 */

const csvUrl =
  "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv";

async function getData() {
  const houseDataReq = await fetch(
    "https://raw.githubusercontent.com/meetnandu05/ml1/master/house.json"
  );
  const houseData = await houseDataReq.json();
  const cleaned = houseData
    .map((house) => ({
      price: house.Price,
      rooms: house.AvgAreaNumberofRooms,
    }))
    .filter((house) => house.price != null && house.rooms != null);

  return cleaned;
}

function convertToTensor(data) {
  return tf.tidy(() => {
    // Step 1\. Shuffle the data
    tf.util.shuffle(data);
    // Step 2\. Convert data to Tensor
    const inputs = data.map((d) => d.rooms);
    const labels = data.map((d) => d.price);
    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
    //Step 3\. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();
    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin));
    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    };
  });
}

export const run = async () => {
  // Load and plot the original input data that we are going to train on.
  const data = await getData();
  const values = data.map((d) => ({
    x: d.rooms,
    y: d.price,
  }));
  tfvis.render.scatterplot(
    { name: "No.of rooms v Price" },
    { values },
    {
      xLabel: "No. of rooms",
      yLabel: "Price",
      height: 300,
    }
  );
};

// export const watchTraining = async (layers, hyperparameters) => {
//   const metrics = ["loss"];
//   const container = {
//     name: "show.fitCallbacks",
//     tab: "Training",
//     styles: {
//       height: "1000px",
//     },
//   };
//   const callbacks = tfvis.show.fitCallbacks(container, metrics);
//   return myModel(layers, hyperparameters, callbacks);
// };

// const loadData = async () => {
//   const csvDataset = tf.data.csv(csvUrl, {
//     columnConfigs: {
//       medv: {
//         isLabel: true,
//       },
//     },
//   });
//   // Number of features is the number of column names minus one for the label
//   const numOfFeatures = (await csvDataset.columnNames()).length - 1;

//   // Prepare the Dataset for training.
//   const flattenedDataset = csvDataset
//     .map(({ xs, ys }) => {
//       // Convert xs(features) and ys(labels) from object form (keyed by column name) to array form.
//       return { xs: Object.values(xs), ys: Object.values(ys) };
//     })
//     .batch(10);
//   console.log(flattenedDataset);

//   return { flattenedDataset, numOfFeatures };
// };

const setupModel = (layers, hyperparameters) => {
  // Define the model.
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));

  layers.forEach((layer) => {
    model.add(
      tf.layers.dense({
        activation: hyperparameters.activation,
        units: layer.neurons,
      })
    );
  });

  model.compile({
    optimizer: tf.train[hyperparameters.optimizer](
      Number(hyperparameters.learningRate)
    ),
    loss: "meanSquaredError",
  });

  return model;
};

export const myModel = async (layers, hyperparameters, fitCallbacks) => {
  const { inputs, labels } = convertToTensor(await getData());
  const model = setupModel(layers, hyperparameters);

  console.log(hyperparameters);
  console.log(model.summary());
  tfvis.show.modelSummary({ name: "Model Summary" }, model);
  // const surface = { name: "show.history", tab: "Training" };
  // document
  //   .querySelector("#show-graphs")
  //   .addEventListener("click", () => watchTraining(model, flattenedDataset));

  // Fit the model using the prepared Dataset
  return model.fit(inputs, labels, {
    batchSize: 8,
    epochs: 10,
    callbacks:[
      {onEpochEnd: async (epoch, logs) => {
        console.log(epoch, logs.loss);
        document.getElementById("epoch").textContent = zeroPadNumber(epoch, 6);
      }},
      tfvis.show.fitCallbacks(
        { name: "Training Performance" },
        ["loss", "mse"],
        {
          height: 200,
          callbacks: ["onEpochEnd"],
        }, 
      )
    ]
    // tfvis.show.fitCallbacks(
    //   { name: "Training Performance" },
    //   ["loss", "mse"],
    //   {
    //     height: 200,
    //     callbacks: ["onEpochEnd"],
    //   }
    // ),
  });
};

// This function is called on clicking the start button.
export const testTensorFlow = () => {
  const t = tf.tensor2d([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  console.log(t.shape.toString());
};

const zeroPadNumber = (num, places) => String(num).padStart(places, "0");
