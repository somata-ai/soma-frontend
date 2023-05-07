import HyperparametersView from "../components/HyperparametersView";
import ArchitectureView from "../components/ArchitectureView";
import { layerTypes } from "../utils";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Network = (props) => {
  const { state } = useLocation();

  const [layers, setLayers] = useState(state !== null ? state.layers : []);

  useEffect(() => {
    state !== null ? console.log(state) : console.log("no");
    // if (state) {
    //   console.log(state.layers);
    // }
  }, []);

  return (
    <div
      style={{
        border: "1px solid transparent",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
      }}
    >
      <HyperparametersView
        layers={layers}
        model={state !== null ? state : null}
      />
      <ArchitectureView layers={layers} updateLayers={setLayers} />

      {/* <svg width="200" height="200" viewBox="-20 -20 40 40">
        <line x1="5" y1="15" x2="15" y2="5" stroke="red" strokeLinecap="round" />
        <line x1="-15" y1="-5" x2="-5" y2="-15" stroke="red" strokeLinecap="round" />
        <line x1="5" y1="-5" x2="15" y2="-15" stroke="red" strokeLinecap="round"/>
        <line x1="-15" y1="15" x2="5" y2="15" stroke="red" strokeLinecap="round"/>
        <line x1="-15" y1="-5" x2="5" y2="-5" stroke="red" strokeLinecap="round"/>
        <line x1="-5" y1="-15" x2="15" y2="-15" stroke="red" strokeLinecap="round"/>

        <line x1="-5" y1="5" x2="15" y2="5" class="back"stroke="red" strokeLinecap="round"/>

        <line x1="-15" y1="15" x2="-15" y2="-5" stroke="red" strokeLinecap="round"/>
        <line x1="5" y1="15" x2="5" y2="-5" stroke="red" strokeLinecap="round"/>
        <line x1="15" y1="5" x2="15" y2="-15" stroke="red" strokeLinecap="round"/>
      </svg> */}
    </div>
  );
};

export default Network;
