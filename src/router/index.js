import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
// import Home from "@/pages/home";
// import Article from "@/pages/article";
// import Publish from "@/pages/publish";
import Authorize from "@/components/authorization";

const lazyLoad = (path) => {
  return lazy(() => import(`@/pages/${path}`));
};

const Home = lazyLoad("home");
const Article = lazyLoad("article");
const Publish = lazyLoad("publish");

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
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"加载中"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"加载中"}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"加载中"}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
