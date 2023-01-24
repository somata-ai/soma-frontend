import HyperparametersView from "./HyperparametersView";
import styles from "../styles/network.module.scss";
import ArchitectureView from "./ArchitectureView";
import { layerTypes } from "../utils";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";

const Network = (props) => {
  const [layers, setLayers] = useState([
    {
      neurons: 2,
      type: layerTypes.linear,
      id: uuid(),
    },
    {
      neurons: 3,
      type: layerTypes.linear,
      id: uuid(),
    },
    {
      neurons: 4,
      type: layerTypes.linear,
      id: uuid(),
    },
  ]);

  return (
    <div className={styles.network}>
      <HyperparametersView />
      <ArchitectureView layers={layers} updateLayers={setLayers} />
    </div>
  );
};

export default Network;
