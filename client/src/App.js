import React from "react";
import "./App.css";
import Map from "./Components/Map/Map";

const App = () => {
  return (
    <div className="App">
      <div>
        <h1 className="heading">
          <b> Weather Map</b>
        </h1>
        <Map />
      </div>
    </div>
  );
};

export default App;
