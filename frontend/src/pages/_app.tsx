import { type AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../contexts/AuthContext";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
};

export default MyApp;
