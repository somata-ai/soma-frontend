import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import Neuron from "./Neuron";
import styles from "../styles/layer.module.scss";

const Layer = (props) => {
  return (
    <div className={styles.layer}>
      {[...Array(props.layer.neurons)].map((x) => {
        return <Neuron />;
      })}
      <div className={styles.buttonsContainer}>
        <IoIosAddCircleOutline className={styles.button} />
        <IoIosRemoveCircleOutline className={styles.button} />
      </div>
    </div>
  );
};

export default Layer;
