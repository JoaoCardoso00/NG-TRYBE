import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return <h1>Dashboard: {user?.username}</h1>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  // TODO: Get user data from API

  return {
    props: {},
  };
});
