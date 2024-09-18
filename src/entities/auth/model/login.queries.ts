import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/shared/api/auth";
import { AuthResponse, TLogin } from "@/shared/lib/types";
import { setLogin } from "./loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Login = useMutation({
    mutationFn: ({ phone, password }: TLogin) => authApi.login({ phone, password }),
    onSuccess: (param: AuthResponse) => {
      if (param && param?.data) {
        navigate("/home");
        dispatch(setLogin(param?.data));
      } else {
        console.warn("Received falsy param, skipping actions.");
      }
    },
  });

  const signup = useMutation({
    mutationFn: authApi.signup,
  });

  return {
    Login,
    signup,
  };
};
