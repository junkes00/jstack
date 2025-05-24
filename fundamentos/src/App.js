import React from "react";

import Layout from "./components/Layout";

import Routes from "./Routes";

import CurrentThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <CurrentThemeProvider>
      <Layout>
        <Routes />
      </Layout>
    </CurrentThemeProvider>
  );
}

export default App;
