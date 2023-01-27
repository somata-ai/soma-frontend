import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";
import Header from "./components/Header";
import Network from "./components/Network";
import "./styles/app.scss";
import SignUp from "./Pages/SignUp";
import { BrowserRouter} from 'react-router-dom';

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
    <div className="app">
      <BrowserRouter>
        <Header>
          <h1>
            A Neural Network Sandbox on <br></br>your Web Browser
          </h1>
        </Header>
        <Network />
      </BrowserRouter>
    </div>
  );
}

export default App;
