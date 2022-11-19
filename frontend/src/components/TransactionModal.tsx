import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface TransactionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function TransactionModal({ isOpen, setIsOpen }: TransactionModalProps) {
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
              <Dialog.Panel className="flex w-full max-w-md transform flex-col gap-12 overflow-hidden rounded-2xl bg-white p-8 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-4xl leading-6 text-gray-900"
                >
                  Nova Transferência
                </Dialog.Title>
                <div className="flex flex-col gap-8">
                  <Input placeholder="Nome do usuário a ser transferido" />
                  <Input type="number" placeholder="Quantidade em R$" />
                </div>
                <Button
                  type="button"
                  className="ring-0 focus:ring-0"
                  onClick={closeModal}
                >
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
