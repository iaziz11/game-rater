import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const { currentUser: loggedInUser, authLoading: isLoadingLoggedInUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingLoggedInUser) return;
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [isLoadingLoggedInUser, loggedInUser, navigate]);

  const shouldBlockRender = isLoadingLoggedInUser || !loggedInUser;

  if (shouldBlockRender) return null;

  return children;
}
