import { myModel, run, watchTraining } from "../models/model";
import { useState, useRef } from "react";
import { HiPlay } from "react-icons/hi2";
import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "../styles/hyperparametersView.module.css";
import DropdownMenu from "./DropdownMenu";
import * as tfvis from "@tensorflow/tfjs-vis";

const options = {
  rateOptions: [0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
  activation: ["relu", "sigmoid", "tanh", "linear"],
  optimizer: ["adam", "sgd", "rmsprop", "adadelta", "adagrad"],
  dataset: ["boston housing", "mnist", "cifar", "eurosat"],
};

const HyperparametersView = (props) => {
  const learningRate = useRef("0.001");
  const activation = useRef("relu");
  const optimizer = useRef("adam");

  const updateLearningRate = (rate) => (learningRate.current = rate);
  const updateActivation = (act) => (activation.current = act);
  const updateOptimizer = (opt) => (optimizer.current = opt);

  return (
    <div className={styles.container}>
      <div className="hover:cursor-pointer font-medium">
        <div
          className={styles.start_button}
          onClick={() => {
            /**
             * Send post req to flask api with
             * layers object
             * hyperparameters object
             * all stringified into json.
             */
          }}
        >
          <span>START</span>
        </div>
      </div>

      <div>
        <button
          id="show-graphs"
          className="border border-black p-2 hover:bg-purple-200"
          onClick={() => {
            tfvis.visor().toggle();
            // const surface = tfvis
            //   .visor()
            //   .surface({ name: "My First Surface", tab: "Input Data" });

            // const drawArea = surface.drawArea;
          }}
        >
          Show graphs
        </button>
      </div>
      <div className="flex flex-col border">
        <h4>Epochs</h4>
        <input
          className="bg-transparent border border-gray-400 pl-2 pr-2 w-20 mt-3 rounded"
          type="number"
        />
      </div>
      <div className={styles.card_container}>
        <Card
          title="Learning Rate"
          options={options.rateOptions}
          update={updateLearningRate}
        ></Card>
        <Card
          title="Activation"
          options={options.activation}
          update={updateActivation}
        ></Card>
        <Card
          title="optimizer"
          options={options.optimizer}
          update={updateOptimizer}
        ></Card>
        {/* <Card title="Regularization Rate" options={options.rateOptions}></Card> */}
        <Card
          title="Dataset"
          options={options.dataset}
          update={() => {}}
        ></Card>
      </div>
    </div>
  );
};

const Card = (props) => {
  const [selected, setSelected] = useState(
    props.options ? props.options[0] : ""
  );

  return (
    <div className={styles.card}>
      <h4>{props.title}</h4>
      <DropdownMenu title={selected}>
        {props.options
          ? props.options.map((option, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelected(option);
                    props.update(option);
                  }}
                >
                  {option}
                </div>
              );
            })
          : ""}
      </DropdownMenu>
    </div>
  );
};

export default HyperparametersView;
