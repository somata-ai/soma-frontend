import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";
import Header from "./components/Header";
import Network from "./components/Network";
// import "./styles/app.scss";

function App() {
  /**
   * Initialize tf when app is loaded.
   */
  useEffect(() => {
    tf.ready().then(() => {
      console.log("TensorFlow Ready");
    });
  }, []);

  return (
    <div className="">
      <Header></Header>
      <Network />
    </div>
  );
}

export default App;
