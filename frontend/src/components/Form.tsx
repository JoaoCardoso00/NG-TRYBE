import Link from "next/link";
import { useState, useContext, FormEvent } from "react";
import { Input } from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "./Button";

interface FormProps {
  formType: "signIn" | "signUp";
}

export function Form({ formType }: FormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signUp } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      username,
      password,
    };

    if (formType === "signIn") {
      await signIn(data);
    } else {
      await signUp(data);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-fit w-[25rem] flex-col items-center justify-center gap-12 rounded-lg bg-white p-8 shadow-lg
        "
    >
      <div>
        <img src="/imgs/ng-logo.png" alt="ng-cash logo"></img>
        <div className="flex w-full flex-col gap-12">
          <Input
            type="text"
            value={username}
            placeholder="Usuário"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            passWordInput
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Button type="submit" className="border border-sky-500">
          {formType === "signIn" ? "Entrar" : "Cadastrar"}
        </Button>
        <Link
          href={formType === "signIn" ? "/signUp" : "/"}
          className="linkHover text-sm text-brand-gray-400"
        >
          {formType === "signIn"
            ? "Não possui conta? Crie uma agora!"
            : "Já possui conta? Entre agora!"}
        </Link>
      </div>
    </form>
  );
}
