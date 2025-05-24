import React, { useContext } from "react";
import { BrowserRouter, Link } from "react-router-dom";

import GlobalStyle from "../../styles/global";
import { Nav } from "./styles";

import Footer from "../Footer";
import Header from "../Header";

import { ThemeProvider } from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";

export default function Layout({ children }) {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />

        <Nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/posts/12311241">Post</Link>
        </Nav>

          {children}
          <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
