export const layerTypes = {
  linear: "linear",
  conv2d: "conv2d",
  maxPool2d: "maxPool2d",
  avgPool2d: "avgPool2d",
};

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

export const renderDenseLayer = (svg, layers, updateLayers, i) => {
  const distanceY = 50;
  const distanceX = 150;
  const neuronDim = 20;
  const offset = 100;
  const offsetx = 100;

  let n;
  for (n = 0; n < layers[i].neurons; n++) {
    if (n > 6) {
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", `${offsetx + i * distanceX}`);
      text.setAttribute("y", `${offset + n * distanceY}`);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "rgb(96 165 250)");
      text.textContent = `+${layers[i].neurons - 7}`;
      svg.appendChild(text);
      break;
    }

    const neuron = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    neuron.setAttribute("cx", `${offsetx + i * distanceX}`);
    neuron.setAttribute("cy", `${offset + n * distanceY}`);
    neuron.setAttribute("r", neuronDim);
    neuron.setAttribute("fill", "white");
    neuron.setAttribute("stroke", "#6a229b");
    neuron.setAttribute("stroke-width", "2");
    svg.appendChild(neuron);

    // For each neuron in second layer and beyound.
    if (i > 0) {
      // For each neuron of previous layer.
      for (let n = 0; n < layers[i - 1].neurons; n++) {
        if (n > 6) {
          break;
        }

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("x1", neuron.getAttribute("cx") - neuronDim);
        line.setAttribute("y1", neuron.getAttribute("cy"));
        line.setAttribute("x2", `${offsetx + (i - 1) * distanceX + neuronDim}`);
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
    "width: 30px; border-radius: 25%; font-size: large; font-weight: 600; color: white; background-color: rgb(96 165 250); margin-right: 2px";
  add.addEventListener("click", addNeuron.bind(this, i, layers, updateLayers));

  remove.textContent = "-";
  remove.style =
    "width: 30px; border-radius: 25%; font-size: large; font-weight: 600; color: white; background-color:  rgb(96 165 250)";
  remove.addEventListener(
    "click",
    removeNeuron.bind(this, i, layers, updateLayers)
  );

  buttonsContainer.append(add, remove);
  foreignObject.appendChild(buttonsContainer);
  svg.appendChild(foreignObject);
};

export const renderConv2dLayer = () => {};

export const renderPoolLayer = () => {};
