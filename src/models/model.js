import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { layerTypes } from "../utils";
/**
 * Write models as a function overhere.
 * Hardcode parameters as variables here for now and use.
 * These parameters will be passed later on as arguments.
 */

// const csvUrl =
//   "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv";

const irisJson =
  "https://storage.googleapis.com/kagglesdsdata/datasets/20079/26025/iris.json?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20230508%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230508T054754Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=33e4ed8d9f7c3a1725da6e0459737df8d7c765541945895f617ed84e543a755578eb36cfa230c5e6fb6a0addc28009cca7c7a76b121829331608cd6315f9d52c0c7ff8fa5e3ae23d32f844076da5a30a44bb96b793eaefb39053cb43cf58916b53c5785f7549c0419f565c046ac85cdf6565443c6ff4304a0a991745b70a5e9ad87ffe57a30439c841e3dc0d1fee47744daba94b58759b1b6d9788874372fce15f643b04bca634fe8615f217d4be3420179f86175381e61e85269e011c4982f95c80ba7b8deebd4784764bac3380e4eb1b5ea2c11f6b5be1981bc436db9fd970dcfe9df2588ffdc0a901863ac9cda7144c7ef2cac06c7c6a7b75e1ccd11a6b2f";

async function getIrisData() {
  const irisDataReq = await fetch(irisJson);
  const irisData = await irisDataReq.json();
  const cleaned = irisData
    .map((iris) => ({
      sepalLength: iris.sepalLength,
      sepalWidth: iris.sepalWidth,
      petalLength: iris.petalLength,
      petalWidth: iris.petalWidth,
      species: iris.species,
    }))
    .filter((iris) => iris.price != null && iris.rooms != null);

  return cleaned;
}

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

  const d = await getIrisData();
  console.log(inputs);
  console.log(hyperparameters);
  console.log(model.summary());
  tfvis.show.modelSummary({ name: "Model Summary" }, model);

  // Fit the model using the prepared Dataset
  return model.fit(inputs, labels, {
    batchSize: 8,
    epochs: 10,
    callbacks: [
      {
        onEpochEnd: async (epoch, logs) => {
          console.log(epoch, logs.loss);
          document.getElementById("epoch").textContent = zeroPadNumber(
            epoch,
            6
          );
        },
      },
      tfvis.show.fitCallbacks(
        { name: "Training Performance" },
        ["loss", "mse"],
        {
          height: 200,
          callbacks: ["onEpochEnd"],
        }
      ),
    ],
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
