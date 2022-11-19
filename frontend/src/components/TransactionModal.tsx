import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./Button";
import { Input } from "./Input";

interface TransactionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type Inputs = {
  username: string;
  value: number;
};

export function TransactionModal({ isOpen, setIsOpen }: TransactionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full max-w-md transform flex-col gap-12 overflow-hidden rounded-2xl bg-white p-8 text-center align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h2"
                  className="text-4xl leading-6 text-gray-900"
                >
                  Nova Transferência
                </Dialog.Title>
                <div className="flex flex-col gap-8">
                  <div className="relative">
                    <Input
                      placeholder="Nome do usuário a ser transferido"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <span className="absolute top-8 left-0 text-sm text-red-500">
                        Nome do usuário obrigatório!
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Quantidade em R$"
                      {...register("value", { required: true })}
                    />
                    {errors.value && (
                      <span className="absolute top-8 left-0 text-sm text-red-500">
                        Valor obrigatório!
                      </span>
                    )}
                  </div>
                </div>
                <Button type="submit" className="ring-0 focus:ring-0">
                  Realizar Transferência
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
