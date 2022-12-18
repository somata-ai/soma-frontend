import { useEffect } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { layerTypes } from "../utils";

import Layer from "./Layer";
import { v4 as uuid } from "uuid";
import styles from "../styles/architectureView.module.scss";

const addLayer = (layers, updateLayers) => {
  const newLayer = {
    neurons: 1,
    type: layerTypes.linear,
    id: uuid(),
  };

  updateLayers([...layers, newLayer]);
};

const removeLayer = (layers, updateLayers) => {
  layers.pop();
  updateLayers([...layers]);
};

const ArchitectureView = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <IoIosAddCircleOutline
          className={styles.button}
          onClick={() => addLayer(props.layers, props.updateLayers)}
        />
        <IoIosRemoveCircleOutline
          className={styles.button}
          onClick={() => removeLayer(props.layers, props.updateLayers)}
        />
        {props.layers.length} Hidden
        {props.layers.length > 1 ? " Layers" : " Layer"}
      </div>

      <div className={styles.architectureContainer}>
        {props.layers.map((layer) => {
          return <Layer key={layer.id} layer={layer} />;
        })}
      </div>
    </div>
  );
};

export default ArchitectureView;
