import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRefreshAccessToken } from "../shared_api/refresh";

export const AuthProvider = ({ children }) => {

  const token = useSelector((state) => state.auth.tokenValue)
  const refreshAccessToken = useRefreshAccessToken()
  useEffect(() => {
    if (!token) {
      refreshAccessToken()
    }
  }, [token]);

  return <>{children}</>;
};
