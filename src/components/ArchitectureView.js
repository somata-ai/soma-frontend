import { useEffect, useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import {
  layerTypes,
  renderDenseLayer,
  renderConv2dLayer,
  renderPoolLayer,
} from "../utils";
import { v4 as uuid } from "uuid";
import styles from "../styles/architectureView.module.css";
import Modal from "./Modal";

const removeLayer = (layers, updateLayers) => {
  layers.pop();
  updateLayers([...layers]);
};

const ArchitectureView = ({ layers, updateLayers, dataset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [denseLayer, setDenseLayer] = useState(
    dataset !== "mnist" ? true : false
  );

  useEffect(() => {
    console.log(dataset !== "mnist" ? true : false);
    setDenseLayer(dataset !== "mnist" ? true : false);
    // updateLayers([]);
  }, [dataset]);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const addLayer = (type = "dense", params = null) => {
    let newLayer;

    switch (type) {
      case "conv2d":
        newLayer = {
          kernel_size: params.kernel_size,
          num_of_kernels: params.num_of_kernels,
          padding: params.padding,
          stride: params.stride,
          type: layerTypes.conv2d,
          // id: uuid(),
          number: layers.length + 1,
        };
        break;
      case "maxPool2d":
        newLayer = {
          kernel_size: params.kernel_size,
          stride: params.stride,
          type: layerTypes.maxPool2d,
          // id: uuid(),
          number: layers.length + 1,
        };
        break;
      case "avgPool2d":
        newLayer = {
          kernel_size: params.kernel_size,
          stride: params.stride,
          type: layerTypes.avgPool2d,
          // id: uuid(),
          number: layers.length + 1,
        };
        break;
      default:
        newLayer = {
          neurons: 1,
          type: layerTypes.dense,
          // id: uuid(),
          number: layers.length + 1,
        };
        break;
    }
    updateLayers([...layers, newLayer]);
  };

  const findDenseLayer = () => {
    if (dataset !== "mnist") {
      return true;
    }
    for (let i = layers.length - 1; i > -1; i--) {
      if (layers[i].type === "dense") {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const renderLayers = () => {
      const network = document.getElementById("network");

      network.childNodes.forEach((element) => {
        network.removeChild(element);
      });

      const canvasWidth = 1000 * Math.ceil(layers.length / 6);
      const canvasHeight = 500;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", "svg");
      svg.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);
      svg.setAttribute("width", `${canvasWidth}`);
      svg.setAttribute("height", `${canvasHeight}`);
      svg.style.display = "block";
      // svg.style.border = "1px solid red";

      // Looping through the layers.
      for (let i = 0; i < layers.length; i++) {
        switch (layers[i].type) {
          case "conv2d":
            renderConv2dLayer(svg, i, layers[i].num_of_kernels);
            break;
          case "maxPool2d":
            renderPoolLayer(svg, i);
            break;
          case "avgPool2d":
            renderPoolLayer(svg, i);
            break;
          default:
            renderDenseLayer(svg, layers, updateLayers, i);
            break;
        }
      }
      network.appendChild(svg);
    };
    renderLayers();
  }, [layers]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        addLayer={addLayer}
        onClose={closeModal}
        denseLayer={denseLayer}
        setDenseLayer={setDenseLayer}
      />

      <div className={styles.buttonsContainer}>
        <IoIosAddCircleOutline
          className={styles.button + " text-blue-400"}
          onClick={() => {
            openModal();
          }}
        />
        <IoIosRemoveCircleOutline
          className={styles.button + " text-blue-400"}
          onClick={() => {
            removeLayer(layers, updateLayers);
            setDenseLayer(findDenseLayer());
          }}
        />
        {layers.length} Hidden
        {layers.length > 1 ? " Layers" : " Layer"}
      </div>
      <p className="mx-auto w-fit text-sm text-gray-500">
        Input/Output layers are handled by default
      </p>
      <div
        id="network"
        className="overflow-auto overflow-y-auto mx-auto mb-10 w-4/5"
        style={{ height: "500px" }}
      ></div>
    </div>
  );
};

export default ArchitectureView;
