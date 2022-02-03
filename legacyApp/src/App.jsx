import React from "react";
import ReactDOM from "react-dom";

// Dynamic import of module federation dependency "host" package.  Using a dynamic import doesn't
// appear to help, compared to a static import
// const ModularFederationHostApp = React.lazy(() => import("host"));

import ModularFederationHostApp from "host";

const App = () => (
  <div>
      This is the legacy application
      <ModularFederationHostApp/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

