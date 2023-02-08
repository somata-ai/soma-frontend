import HyperparametersView from "../components/HyperparametersView";
import ArchitectureView from "../components/ArchitectureView";
import { layerTypes } from "../utils";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { redirect } from "react-router-dom";

const Network = (props) => {
  const [layers, setLayers] = useState([
    {
      neurons: 1,
      type: layerTypes.linear,
      id: uuid(),
      number: 1,
    },
  ]);

  return (
    <div style={{ border: "1px solid transparent", backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
      <HyperparametersView />
      <ArchitectureView layers={layers} updateLayers={setLayers} />
    </div>
  );
};

export default Network;
