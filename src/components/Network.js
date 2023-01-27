import HyperparametersView from "./HyperparametersView";
import styles from "../styles/network.module.scss";
import ArchitectureView from "./ArchitectureView";
import { layerTypes } from "../utils";
import { v4 as uuid } from "uuid";
import {useState } from "react";
import SignUP from "../Pages/SignUp";
import Login from "../Pages/Login"
import Pages from "./Pages";


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
    
    <div className={styles.network}>
      <HyperparametersView />
      <ArchitectureView layers={layers} updateLayers={setLayers} />
      <div className={styles.div}>
        <SignUP />
        <Login />
      </div>
      <Pages />

    </div>
  );
};

export default Network;
