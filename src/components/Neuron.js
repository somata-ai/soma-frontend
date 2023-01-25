import styles from "../styles/neuron.module.scss";

const Neuron = (props) => {
  return (
    <div
      id={props.id}
      className={styles.neuron}
      data-type="neuron"
      data-layer={props.layerNumber}
    ></div>
  );
};

export default Neuron;
