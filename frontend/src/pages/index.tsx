import { GetServerSideProps } from "next";
import { withSSRGuest } from "../utils/withSSRGuest";
import { AuthForm } from "../components/AuthForm";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-[url('/imgs/bg.jpeg')] ">
      <AuthForm formType="signIn" />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
