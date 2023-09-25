import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const goodDispatch = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const okDispatch = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const badDispatch = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const resetDispatch = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={goodDispatch}>good</button>
      <button onClick={okDispatch}>ok</button>
      <button onClick={badDispatch}>bad</button>
      <button onClick={resetDispatch}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok} </div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
