import { useEffect, useRef } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import React from "react";
import { layerTypes } from "../utils";
import { v4 as uuid } from "uuid";
import styles from "../styles/architectureView.module.css";

const addNeuron = (index, layers, updateLayers) => {
  const updatedLayers = [...layers];
  updatedLayers[index].neurons++;
  updateLayers(updatedLayers);
};

const removeNeuron = (index, layers, updateLayers) => {
  if (layers[index].neurons > 1) {
    const updatedLayers = [...layers];
    updatedLayers[index].neurons--;
    updateLayers(updatedLayers);
  } else if (layers[index].neurons === 1) {
    const updatedLayers = [...layers];
    updatedLayers.splice(index, 1);
    updateLayers(updatedLayers);
  }
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

const ArchitectureView = ({ layers, updateLayers }) => {
  useEffect(() => {
    const renderLayers = () => {
      const network = document.getElementById("network");

      network.childNodes.forEach((element) => {
        network.removeChild(element);
      });

      const distanceY = 50;
      const distanceX = 150;
      const neuronDim = 20;
      const canvasWidth = 1000 * Math.ceil(layers.length / 6);
      const canvasHeight = 500;
      const offset = 100;
      const offsetx = 100;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", "svg");
      svg.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);
      svg.setAttribute("width", `${canvasWidth}`);
      svg.setAttribute("height", `${canvasHeight}`);
      svg.style.display = "block";

      // Looping through the layers.
      for (let i = 0; i < layers.length; i++) {
        // Looping through neurons for each layer.

        if (layers[i].neurons > 8) {
          //increase the svg viewbox height.
          const newHeight = Math.ceil(layers[i].neurons / 8) * canvasHeight;
          svg.setAttribute("viewBox", `0 0 ${canvasWidth} ${newHeight}`);
          svg.setAttribute("height", `${newHeight}`);
        }

        let n;
        for (n = 0; n < layers[i].neurons; n++) {
          const neuron = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

          neuron.setAttribute("cx", `${offsetx + i * distanceX}`);
          neuron.setAttribute("cy", `${offset + n * distanceY}`);
          neuron.setAttribute("r", neuronDim);
          neuron.setAttribute("fill", "#6a229b");

          svg.appendChild(neuron);

          // For each neuron in second layer and beyound.
          if (i > 0) {
            // For each neuron of previous layer.
            for (let n = 0; n < layers[i - 1].neurons; n++) {
              const line = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
              );
              line.setAttribute("x1", neuron.getAttribute("cx"));
              line.setAttribute("y1", neuron.getAttribute("cy"));
              line.setAttribute("x2", `${offsetx + (i - 1) * distanceX}`);
              line.setAttribute("y2", `${offset + n * distanceY}`);
              line.setAttribute("stroke", "#6a229b");
              line.style.display = "block";

              svg.appendChild(line);
            }
          }
        }
        const foreignObject = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "foreignObject"
        );
        foreignObject.setAttribute(
          "x",
          `${offsetx + i * distanceX - 1.5 * neuronDim}`
        );
        foreignObject.setAttribute("y", `${40}`);
        foreignObject.setAttribute("width", "70");
        foreignObject.setAttribute("height", "30");

        const buttonsContainer = document.createElement("div");

        const add = document.createElement("button");
        const remove = document.createElement("button");

        add.textContent = "+";
        add.style =
          "width: 30px; border-radius: 25%; font-size: large; font-weight: 600; color: white; background-color: purple; margin-right: 2px";
        add.addEventListener(
          "click",
          addNeuron.bind(this, i, layers, updateLayers)
        );

        remove.textContent = "-";
        remove.style =
          "width: 30px; border-radius: 25%; font-size: large; font-weight: 600; color: white; background-color: purple";
        remove.addEventListener(
          "click",
          removeNeuron.bind(this, i, layers, updateLayers)
        );

        buttonsContainer.append(add, remove);
        foreignObject.appendChild(buttonsContainer);
        svg.appendChild(foreignObject);
      }

      network.appendChild(svg);
    };

    renderLayers();
  }, [layers]);

  return (
    <div>
      <div className={styles.buttonsContainer}>
        <IoIosAddCircleOutline
          className={styles.button}
          onClick={() => addLayer(layers, updateLayers)}
        />
        <IoIosRemoveCircleOutline
          className={styles.button}
          onClick={() => removeLayer(layers, updateLayers)}
        />
        {layers.length} Hidden
        {layers.length > 1 ? " Layers" : " Layer"}
      </div>

      <div
        id="network"
        className="overflow-auto overflow-y-auto mx-auto mb-10 shadow-zinc-600 shadow-xl w-4/5"
        style={{ height: "500px" }}
      ></div>
    </div>
  );
};

export default ArchitectureView;
