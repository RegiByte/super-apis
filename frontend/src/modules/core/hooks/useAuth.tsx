import { useNavigate } from "react-router-dom";
import { useSwr } from "./useSwr";
import axios from "axios";
import { apiClient } from "../../../services/http";
import { useEffect } from "react";

interface UseAuthParams {
  middleware: "guest" | "auth";
  redirectIfAuthenticated?: string;
}

interface RegisterParams {
  setErrors: (errors: Record<string, any>[]) => void;

  [prop: string]: any;
}

interface LoginParams {
  setErrors: (errors: Record<string, any>[]) => void;
  setStatus: (status: string | null) => void;

  [prop: string]: any;
}

interface UseAuthHook {
  user?: Record<string, any>;
  register: (params: RegisterParams) => Promise<void>;
  login: (params: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthParams): UseAuthHook => {
  const navigate = useNavigate();

  const {
    data: user,
    error,
    mutate,
  } = useSwr(
    "/api/user",
    () =>
      apiClient
        .get("/api/user")
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        }),
    {
      shouldRetryOnError: false,
    },
  );

  const csrf = () => apiClient.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }: RegisterParams) => {
    await csrf();
    setErrors([]);

    apiClient
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginParams) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    apiClient
      .post("/login", props, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const logout: UseAuthHook["logout"] = async () => {
    if (!error) {
      await apiClient.post("/logout").then(() => mutate(null));
    }

    navigate("/");
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      navigate(redirectIfAuthenticated);
    }

    if (middleware === "auth" && error) {
      logout().catch((error) => {
        throw error;
      });
    }
  }, [user, error]);

  return {
    user,
    register,
    login,
    logout,
  };
};
