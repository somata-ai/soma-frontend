import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as data from "./irisdata.js";

let model;

async function trainModel(xTrain, yTrain, xTest, yTest, layers, hyperparameters) {
  const params = {
    learningRate: 0.001,
    epochs: 10,
  };
  // Define the topology of the model: two dense layers.
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 10,
      activation: "sigmoid",
      inputShape: [xTrain.shape[1]],
    })
  );

  layers.forEach((layer) => {
    model.add(
      tf.layers.dense({
        activation: hyperparameters.activation,
        units: layer.neurons,
      })
    );
  });

  model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

  model.summary();
  tfvis.show.modelSummary({ name: "Model Architecture", tab: "Model" }, model);
  const optimizer = tf.train.adam(params.learningRate);
  model.compile({
    optimizer: optimizer,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  const metrics = ["loss", "val_loss", "acc", "val_acc"];
  const container = {
    name: "Model Training",
    tab: "Model",
    styles: { height: "1000px" },
  };
  const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

  // Call `model.fit` to train the model.
  const history = await model.fit(xTrain, yTrain, {
    epochs: params.epochs,
    validationData: [xTest, yTest],
    callbacks: fitCallbacks,
  });
  return model;
}

/**
 * The main function of the Iris demo.
 */
export async function runIris(layers, hyperparameters) {
  const [xTrain, yTrain, xTest, yTest] = data.getIrisData(0.15);

  model = await trainModel(xTrain, yTrain, xTest, yTest, layers, hyperparameters);
}
