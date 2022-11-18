import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import { api } from "../services/apiClient";

type User = {
  id: string;
  username: string;
  account: {
    id: string;
    balance: number;
  };
};

export type AuthCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  signUp(credentials: AuthCredentials): Promise<void | string>;
  signIn(credentials: AuthCredentials): Promise<void | string>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/users", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const { id, username, account } = response.data;

          setUser({ id, username, account });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signUp({ username, password }: AuthCredentials) {
    try {
      const response = await api.post("/auth/signup", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      setCookie(undefined, "nextauth.token", accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      api.defaults.headers["token"] = `${accessToken}`;

      Router.push("/dashboard");
    } catch (err: any) {
      console.log(err.response.data);
    }
  }

  async function signIn({ username, password }: AuthCredentials) {
    try {
      const response = await api.put("/auth/signIn", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      setCookie(undefined, "nextauth.token", accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      api.defaults.headers["token"] = `${accessToken}`;

      Router.push("/dashboard");
    } catch (err: any) {
      console.log(err.response.data);
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
