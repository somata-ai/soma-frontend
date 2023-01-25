import styles from "../styles/neuron.module.scss";

const Neuron = (props) => {
  return <div id={props.id} className={styles.neuron}></div>;
};

export default Neuron;
