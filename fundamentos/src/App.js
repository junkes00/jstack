import React from "react";

import Layout from "./components/Layout";

import CurrentThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <CurrentThemeProvider>
      <Layout />
    </CurrentThemeProvider>
  );
}

export default App;
