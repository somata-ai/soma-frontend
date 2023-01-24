import * as tf from "@tensorflow/tfjs";
import { layerTypes } from "../utils";
/**
 * Write models as a function overhere.
 * Hardcode parameters as variables here for now and use.
 * These parameters will be passed later on as arguments.
 */

export const myModel = () => {
  const activation = "relu";
  const regularization = "l2";
  const problemType = "classification";
  const layers = [
    {
      neurons: 2,
      type: layerTypes.linear,
    },
    {
      neurons: 3,
      type: layerTypes.linear,
    },
  ];

  // Complete the model.
};

// This function is called on clicking the start button.
export const testTensorFlow = () => {
  const t = tf.tensor2d([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  console.log(t.shape.toString());
};
