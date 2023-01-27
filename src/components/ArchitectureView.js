import { useEffect, useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { layerTypes } from "../utils";
import { v4 as uuid } from "uuid";
import Xarrow from "react-xarrows";
import Layer from "./Layer";
import styles from "../styles/architectureView.module.scss";

const renderArrows = () => {
  const n1 = document.querySelectorAll('div[data-layer="1"]');
  const n2 = document.querySelectorAll('div[data-layer="2"]');
  const arrows = [];

  for (let i = 0; i < n1.length; i++) {
    for (let j = 0; j < n2.length; j++) {
      arrows.push({
        start: n1[i].getAttribute("id"),
        end: n2[j].getAttribute("id"),
      });
    }
  }

  console.log(n1);
  console.log(n2);
  console.log(arrows);
  return arrows;
};

const addLayer = (layers, updateLayers) => {
  const newLayer = {
    neurons: 1,
    type: layerTypes.linear,
    id: uuid(),
    number: layers.length + 1,
  };
  updateLayers([...layers, newLayer]);
};

const removeLayer = (layers, updateLayers) => {
  layers.pop();
  updateLayers([...layers]);
};

const TestComponent = (props) => {
  const [arrows, setArrows] = useState([]);

  useEffect(() => {
    const newArrows = renderArrows();
    console.log(newArrows);
    setArrows(newArrows);
  }, [props.layers]);

  return (
    <>
      {arrows.map((arrow) => {
        return (
          <Xarrow
            start={arrow.start}
            end={arrow.end}
            showHead={false}
            startAnchor={"right"}
            endAnchor={"left"}
            strokeWidth="1"
            path={"straight"}
            animateDrawing={true}
          />
        );
      })}
    </>
  );
};

const ArchitectureView = (props) => {
  // const [arrows, setArrows] = useState([]);

  // useEffect(() => {
  //   const newArrows = renderArrows();
  //   console.log(newArrows);
  //   // setArrows(newArrows);
  // }, [props.layers]);

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
          return (
            <Layer
              key={layer.id}
              layer={layer}
              layers={props.layers}
              updateLayers={props.updateLayers}
            />
          );
        })}
      </div>

      <TestComponent layers={props.layers} />

      {/* {arrows.map((arrow) => {
        return (
          <div>
            hello
            <p>{arrow.start}</p>
          </div>
          // <Xarrow
          //   start={arrow.start}
          //   end={arrow.end}
          //   showHead={false}
          //   startAnchor={"bottom"}
          //   strokeWidth="1"
          //   path={"straight"}
          // />
        );
      })} */}

    </div>
    

  );
};

export default ArchitectureView;
