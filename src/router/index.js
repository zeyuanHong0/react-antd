import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Authorize from "@/components/authorization";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Authorize>
        <Layout />
      </Authorize>
    ),
  },
]);

export default router;
