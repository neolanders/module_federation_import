import React from "react";
// import ReactDOM from "react-dom";
import FederatedWrapper from "./FederatedWrapper";

//1. If the dynamic Header import is removed and....
const Header = React.lazy(() => import("my-nav/Header"));

import "./index.scss";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    {/* 2. This whole FederatedWrapper component and it child are removed, then
        legacyApp can load it successfully.  At that point, we're not actively
        doing anything with module federation, of course

        With both 1 and 2 in place, then legacyApp will load this host package, but
        it will fail to load the Header component
     */}
    <FederatedWrapper
      error={<div>Temporary Header</div>}
      delayed={<div>Loading header...</div>}
    >
      <Header />
    </FederatedWrapper>
      This is the npm included host, which attempts to use module federation to include the header
      from another package
  </div>
);
// ReactDOM.render(<App />, document.getElementById("app"));
export default App;
