import { GetServerSideProps } from "next";
import { AuthForm } from "../components/AuthForm";
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-[url('/imgs/bg.jpeg')] ">
      <AuthForm formType="signUp" />
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
