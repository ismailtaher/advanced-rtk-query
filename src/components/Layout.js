import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Layout;
