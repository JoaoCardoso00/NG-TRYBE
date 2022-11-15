import { type NextPage } from "next";
import { LoginForm } from "./components/LoginForm";

const Home: NextPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Home;
