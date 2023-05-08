import { myModel, run, watchTraining } from "../models/model";
import { useState, useRef } from "react";
import { HiPlay } from "react-icons/hi2";
import { BsArrowCounterclockwise } from "react-icons/bs";
import styles from "../styles/hyperparametersView.module.css";
import DropdownMenu from "./DropdownMenu";
import * as tfvis from "@tensorflow/tfjs-vis";
import SaveModal from "./SaveModal";
import { useAuth } from "../context/auth";
import { runMnist } from "../models/mnist";
import { runIris } from "../models/iris";

const options = {
  rateOptions: [0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
  activation: ["relu", "sigmoid", "tanh", "linear"],
  optimizer: ["adam", "sgd", "rmsprop", "adadelta", "adagrad"],
  dataset: ["boston-housing", "mnist", "iris"],
};

const HyperparametersView = (props) => {
  const auth = useAuth();
  const learningRate = useRef("0.001");
  const activation = useRef("relu");
  const optimizer = useRef("adam");

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const updateLearningRate = (rate) => (learningRate.current = rate);
  const updateActivation = (act) => (activation.current = act);
  const updateOptimizer = (opt) => (optimizer.current = opt);

  return (
    <>
      <SaveModal
        isOpen={isOpen}
        onClose={closeModal}
        model={props.model}
        params={{
          layers: props.layers,
          learningRate: learningRate.current,
          optimizer: optimizer.current,
        }}
      />
      <div className={styles.container}>
        <div className="hover:cursor-pointer text-sm font-medium">
          <div
            className={styles.start_button}
            onClick={() => {
              // myModel(props.layers, {
              //   learningRate: learningRate.current,
              //   activation: activation.current,
              //   optimizer: optimizer.current,
              // });
              // run();

              // runMnist(props.layers, {});
              runIris(props.layers, {
                learningRate: learningRate.current,
                activation: activation.current,
                optimizer: optimizer.current,
              });
            }}
          >
            <HiPlay />
            {/* <span>START</span> */}
          </div>
        </div>
        <div className={styles.epoch}>
          <h4>Epoch</h4>
          <p id="epoch" className="text-lg">
            000000
          </p>
        </div>

        <div>
          <button
            id="show-graphs"
            className="text-sm rounded-lg border border-black p-2 hover:bg-purple-200"
            onClick={() => {
              tfvis.visor().toggle();
              const surface = tfvis
                .visor()
                .surface({ name: "My First Surface", tab: "Input Data" });

              const drawArea = surface.drawArea;
            }}
          >
            Show graphs
          </button>
        </div>
        <div>
          {auth.user ? (
            <button
              onClick={() => {
                if (
                  props.model &&
                  props.model.user_id !== Number(localStorage.user)
                ) {
                  return;
                }
                openModal();
              }}
              className="text-sm rounded-lg border border-black p-2 hover:bg-purple-200"
            >
              Save Model
            </button>
          ) : (
            ""
          )}
        </div>
        {/* <div className="flex flex-col border">
          <span className="text-sm">Epochs</span>
          <input
            className="bg-transparent border border-gray-400 pl-2 pr-2 w-20 mt-3 rounded-lg"
            type="number"
            value={epochs}
            onChange={(e) => {
              if (e.target.value > 0) {
                setEpochs(e.target.value);
              } else {
                setEpochs(1);
              }
            }}
          />
        </div> */}
        <div className="flex flex-row justify-evenly w-3/5">
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
    </>
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
