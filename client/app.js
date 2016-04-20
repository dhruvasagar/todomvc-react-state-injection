// Styles
require("!style!css!less!./styles/app.less");

// JS Imports
import Rx from "rx";
import React from "react";
import {render} from "react-dom";

import appState from "./stores/app_state";
import TodoApp from "./components/todos/app";

var renderApp = () => {
  render(<TodoApp />, document.getElementById("root"));
};

renderApp();
const MAX_DURATION_FOR_60_FPS = 16; /* ms */
var appStateObserver = Rx.Observable.fromEventPattern(handler => {
  return appState.on("swap", handler);
}).debounce(MAX_DURATION_FOR_60_FPS);
appStateObserver.subscribe(renderApp);
