import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Network from "./pages/Network";
import Settings from "./pages/Settings";

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
      <Routes>
        <Route path="/" element={<Navigate to="/model" replace />} />
        <Route path="/model" element={<Network />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
