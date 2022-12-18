import Header from "./components/Header";
import Network from "./components/Network";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      <Header>
        <h1>
          A Neural Network Sandbox on <br></br>your Web Browser
        </h1>
      </Header>
      <Network />
    </div>
  );
}

export default App;
