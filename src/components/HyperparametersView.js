import { myModel } from "../models/model";
import { useState, useRef } from "react";
import { HiPlay } from "react-icons/hi2";
import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "../styles/hyperparametersView.module.css";
import DropdownMenu from "./DropdownMenu";

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
      <div className={styles.buttons_container}>
        <BsArrowCounterclockwise className={styles.reset_button} />
        <div
          className={styles.start_button}
          onClick={() =>
            myModel(props.layers, {
              learningRate: learningRate.current,
              activation: activation.current,
              optimizer: optimizer.current,
            })
          }
        >
          <HiPlay />
        </div>
        {/* <div>ne</div> */}
      </div>

      <div className={styles.epoch}>
        <h4>Epoch</h4>
        <p id="epoch" className="text-lg">
          000000
        </p>
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
