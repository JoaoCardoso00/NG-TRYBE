import { GetServerSideProps } from "next";
import { FormEvent, useContext, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from "../utils/withSSRGuest";
import Link from "next/link";
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
