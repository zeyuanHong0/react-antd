import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout";
import Login from "@/pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/index",
    element: <Layout />,
  },
]);

export default router;
