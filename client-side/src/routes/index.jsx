import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import MyTable from "../pages/table/my-table";
export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mytable" element={<MyTable />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
