import { testTensorFlow } from "../models/model";
import { useState } from "react";
import { HiPlay } from "react-icons/hi2";
import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "../styles/hyperparametersView.module.scss";
import DropdownMenu from "./DropdownMenu";

const options = {
  rateOptions: [0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
  activation: ["Tanh", "Sigmoid", "ReLU", "Linear"],
  regularization: ["L1", "L2"],
  problemType: ["Classification", "Regression"],
};

const HyperparametersView = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons_container}>
        <BsArrowCounterclockwise className={styles.reset_button} />
        <div className={styles.start_button}>
          <HiPlay onClick={() => testTensorFlow()} />
        </div>
        {/* <div>ne</div> */}
      </div>

      <div className={styles.epoch}>
        <h4>Epoch</h4>
        <p>000,000</p>
      </div>
      <div className={styles.card_container}>
        <Card title="Learning Rate" options={options.rateOptions}></Card>
        <Card title="Activation" options={options.activation}></Card>
        <Card title="Regularization" options={options.regularization}></Card>
        <Card title="Regularization Rate" options={options.rateOptions}></Card>
        <Card title="Problem Type" options={options.problemType}></Card>
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
                <div key={index} onClick={() => setSelected(option)}>
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
