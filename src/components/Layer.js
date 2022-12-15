import styles from "../styles/layer.module.scss";
import Neuron from "./Neuron";

const Layer = (props) => {
  return (
    <div className={styles.layer}>
      {[...Array(props.layer.neurons)].map((x) => {
        return <Neuron />;
      })}
    </div>
  );
};

export default Layer;
