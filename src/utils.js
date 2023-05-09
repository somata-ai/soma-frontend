export const layerTypes = {
  dense: "dense",
  conv2d: "conv2d",
  maxPool2d: "maxPool2d",
  avgPool2d: "avgPool2d",
};

//"http://localhost:5050";
export const NODE_API_URL = "http://54.206.20.11:5050";

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
    return;
  }
};

const renderCube = (svg, distanceX, caption) => {
  const offset = 250;
  const offsetx = 100 + distanceX;

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", 5 + offsetx);
  line1.setAttribute("y1", 80 + offset);
  line1.setAttribute("x2", 50 + offsetx);
  line1.setAttribute("y2", 5 + offset);
  line1.setAttribute("stroke", "#6a229b");
  line1.setAttribute("strokeLinecap", "round");
  line1.setAttribute("stroke-width", 2);

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", -70 + offsetx);
  line2.setAttribute("y1", 5 + offset);
  line2.setAttribute("x2", -25 + offsetx);
  line2.setAttribute("y2", -70 + offset);
  line2.setAttribute("stroke", "#6a229b");
  line2.setAttribute("strokeLinecap", "round");
  line2.setAttribute("stroke-width", 2);

  const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line3.setAttribute("x1", 5 + offsetx);
  line3.setAttribute("y1", 5 + offset);
  line3.setAttribute("x2", 50 + offsetx);
  line3.setAttribute("y2", -70 + offset);
  line3.setAttribute("stroke", "#6a229b");
  line3.setAttribute("strokeLinecap", "round");
  line3.setAttribute("stroke-width", 2);

  const line4 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line4.setAttribute("x1", -70 + offsetx);
  line4.setAttribute("y1", 80 + offset);
  line4.setAttribute("x2", 5 + offsetx);
  line4.setAttribute("y2", 80 + offset);
  line4.setAttribute("stroke", "#6a229b");
  line4.setAttribute("strokeLinecap", "round");
  line4.setAttribute("stroke-width", 2);

  const line5 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line5.setAttribute("x1", -70 + offsetx);
  line5.setAttribute("y1", 5 + offset);
  line5.setAttribute("x2", 5 + offsetx);
  line5.setAttribute("y2", 5 + offset);
  line5.setAttribute("stroke", "#6a229b");
  line5.setAttribute("strokeLinecap", "round");
  line5.setAttribute("stroke-width", 2);

  const line6 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line6.setAttribute("x1", -25 + offsetx);
  line6.setAttribute("y1", -70 + offset);
  line6.setAttribute("x2", 50 + offsetx);
  line6.setAttribute("y2", -70 + offset);
  line6.setAttribute("stroke", "#6a229b");
  line6.setAttribute("strokeLinecap", "round");
  line6.setAttribute("stroke-width", 2);

  const line7 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line7.setAttribute("x1", -70 + offsetx);
  line7.setAttribute("y1", 80 + offset);
  line7.setAttribute("x2", -70 + offsetx);
  line7.setAttribute("y2", 5 + offset);
  line7.setAttribute("stroke", "#6a229b");
  line7.setAttribute("strokeLinecap", "round");
  line7.setAttribute("stroke-width", 2);

  const line8 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line8.setAttribute("x1", 5 + offsetx);
  line8.setAttribute("y1", 80 + offset);
  line8.setAttribute("x2", 5 + offsetx);
  line8.setAttribute("y2", 5 + offset);
  line8.setAttribute("stroke", "#6a229b");
  line8.setAttribute("strokeLinecap", "round");
  line8.setAttribute("stroke-width", 2);

  const line9 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line9.setAttribute("x1", 50 + offsetx);
  line9.setAttribute("y1", 5 + offset);
  line9.setAttribute("x2", 50 + offsetx);
  line9.setAttribute("y2", -70 + offset);
  line9.setAttribute("stroke", "#6a229b");
  line9.setAttribute("strokeLinecap", "round");
  line9.setAttribute("stroke-width", 2);

  svg.append(line1, line2, line3, line4, line5, line6, line7, line8, line9);

  // const marker = document.createElementNS(
  //   "http://www.w3.org/2000/svg",
  //   "marker"
  // );
  // marker.id = "arrow";
  // marker.setAttribute("viewBox", "0 0 10 10");
  // marker.setAttribute("refX", "5");
  // marker.setAttribute("refY", "5");
  // marker.setAttribute("width", "6");
  // marker.setAttribute("height", "6");
  // marker.setAttribute("orient", "auto-start-reverse");

  // const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  // arrow.setAttribute("x1", offsetx + 75);
  // arrow.setAttribute("y1", offset);
  // arrow.setAttribute("x2", offsetx + 30);
  // arrow.setAttribute("y2", offset);
  // arrow.setAttribute("stroke", "#6a229b");
  // arrow.setAttribute("strokeLinecap", "round");
  // arrow.setAttribute("stroke-width", 2);
  // arrow.setAttribute("marker-end", "url(#arrow)");
  // svg.append(arrow, marker);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", `${offsetx}`);
  text.setAttribute("y", `${offset * 1.5}`);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "rgb(96 165 250)");
  text.textContent = `${caption}`;
  svg.appendChild(text);
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

export const renderConv2dLayer = (svg, i, kernels) => {
  renderCube(svg, 150 * i, `${kernels} filters`);
};

export const renderPoolLayer = (svg, i) => {
  renderCube(svg, 150 * i, "Pool Layer");
};
