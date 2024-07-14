import { http } from "@/utils";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    http.get("user/profile");
  }, []);
  return (
    <div>
      <h1>Layout</h1>
    </div>
  );
};

export default Layout;
