import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuth.context";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoutes;
