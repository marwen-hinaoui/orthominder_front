import apiInstance from "./axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { set_error, clear_auth, set_token, set_authenticated } from "../redux-toolkit/slices/user_slices/user_slice";

export const useRefreshAccessToken = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const redirection = useSelector((state) => state.auth.redirection)

    const refreshToken = async () => {
    dispatch(set_error(null));

    try {
      const res = await apiInstance.post("/api/ref/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        dispatch(set_authenticated(true));
        dispatch(set_token(res.data.access));
        navigate(redirection);
      }
    } catch (error) {
      if (error.status === 401) {
        dispatch(clear_auth());
        dispatch(set_error(error.response.data.error));
        dispatch(set_authenticated(false));
      }
    }
  };

  return refreshToken
}