import Link from "next/link";
import { useContext } from "react";
import { Input, PasswordInput } from "./Input";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "./Button";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps {
  formType: "signIn" | "signUp";
}

type Inputs = {
  username: string;
  password: string;
};

export function AuthForm({ formType }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn, signUp } = useContext(AuthContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (formType === "signIn") {
      const err = await signIn(data);

      if (err) {
        toast.error(err);
      }
    } else {
      const err = await signUp(data);

      if (err) {
        toast.error(err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-fit w-[25rem] flex-col items-center justify-center gap-12 rounded-lg bg-white p-8 shadow-lg
        "
    >
      <div>
        <img src="/imgs/ng-logo.png" alt="ng-cash logo"></img>
        <div className="flex w-full flex-col gap-12">
          <div className="relative flex flex-col">
            <Input
              type="text"
              placeholder="Usuário"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="absolute top-9 text-sm text-red-500">
                Nome de usuário obrigatório!
              </span>
            )}
          </div>

          <div className="relative">
            <PasswordInput
              placeholder="Senha"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="absolute top-9 text-sm text-red-500">
                Senha obrigatória!
              </span>
            )}
          </div>
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
