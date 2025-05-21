import React, { useContext } from "react";

import GlobalStyle from "../../styles/global";

import Footer from "../Footer";
import Header from "../Header";
import PostsList from "../PostList";

import { ThemeProvider } from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";

export default function Layout() {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Header />
      <PostsList />
      <Footer />
    </ThemeProvider>
  );
}
