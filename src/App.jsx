import React from "react";
import { Button } from "@/components/ui/button";
import StatusBudget from "./components/StatusBudget";
import MyCard from "./components/MyCard";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./pages/Details";
function App() {
  const routs = createBrowserRouter([
    {
      path : "/",
      element: <Home />
    },
    {
      path: "/:id",
      element: <Details />
    },
  ])
  return (
      <RouterProvider router={routs} />
  );
}

export default App;
