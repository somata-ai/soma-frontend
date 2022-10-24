import Header from "./components/Header";
import HyperparametersView from "./components/HyperparametersView";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      <Header>
        <h1>
          A Neural Network Sandbox on <br></br>your Web Browser
        </h1>
      </Header>
      <HyperparametersView />
    </div>
  );
}

export default App;
