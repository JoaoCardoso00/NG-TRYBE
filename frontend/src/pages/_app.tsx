import { type AppType } from "next/dist/shared/lib/utils";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContext";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
};

export default MyApp;
