import React from "react";
// import ReactDOM from "react-dom";
import FederatedWrapper from "./FederatedWrapper";

//1. If the dynamic Header import is removed and....
// const Header = React.lazy(() => import("my-nav/Header"));

import "./index.scss";

function loadComponent(scope, module) {
  return () =>
    window[scope].get(module).then((factory) => {
      const Module = factory();
      return Module;
    });
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function System(props) {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });

  if (!props.system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
}

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    {/* 2. This whole FederatedWrapper component and it child are removed, then
        legacyApp can load it successfully.  At that point, we're not actively
        doing anything with module federation, of course

        With both 1 and 2 in place, then legacyApp will load this host package, but
        it will fail to load the Header component
     */}
    {/* <FederatedWrapper
      error={<div>Temporary Header</div>}
      delayed={<div>Loading header...</div>}
    >
      <Header />
    </FederatedWrapper> */}
    <System
      system={{
        url: "http://localhost:3001/remoteEntry.js",
        scope: "nav",
        module: "./Header",
      }}
    />
    This is the npm included host, which attempts to use module federation to
    include the header from another package
  </div>
);
// ReactDOM.render(<App />, document.getElementById("app"));
export default App;
