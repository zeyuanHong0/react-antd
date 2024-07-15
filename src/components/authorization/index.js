import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

const Authorize = ({ children }) => {
  if (getToken()) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Authorize;
