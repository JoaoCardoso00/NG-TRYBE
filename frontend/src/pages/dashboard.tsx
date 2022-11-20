import { ReactNode, useEffect, useState } from "react";
import { signOut, User } from "../contexts/AuthContext";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupApiClient } from "../services/api";
import { Button } from "../components/Button";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  SignOut,
} from "phosphor-react";
import { TransactionModal } from "../components/TransactionModal";
import { api } from "../services/apiClient";
import { useRouter } from "next/router";
import { FilterMenu } from "../components/FilterMenu";

interface dashboardProps {
  user: User;
}

export interface Transaction {
  id: string;
  value: number;
  createdAt: string;
  debitedAccount: string;
  creditedAccount: string;
}

export default function Dashboard({ user }: dashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<"all" | "debited" | "credited">("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : filter === "debited"
      ? transactions.filter(
          (transaction) => transaction.debitedAccount === user.account.id
        )
      : transactions.filter(
          (transaction) => transaction.creditedAccount === user.account.id
        );

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    api.get("/users/transactions").then((response) => {
      setTransactions(response.data);
    });
  }, [user]);

  let totalDebitedValue = transactions
    .filter((t) => t.debitedAccount === user.account.id)
    .reduce((acc, t) => acc + t.value, 0);

  let totalCreditedValue = transactions
    .filter((t) => t.creditedAccount === user.account.id)
    .reduce((acc, t) => acc + t.value, 0);

  return (
    <>
      <TransactionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        refreshData={refreshData}
      />
      <main className="flex min-h-screen w-screen flex-col items-center bg-brand-gray-100 pb-8">
        <nav className="flex h-64 w-screen items-start justify-around bg-black">
          <img
            src="/imgs/logoDark.png"
            alt="ng-cash logo"
            className="h-[8rem] w-[22rem]"
          />
          <div className="mt-12 mr-16 flex w-[25rem] gap-8">
            <Button
              className="flex w-52 items-center justify-center gap-2 border-white bg-black text-2xl text-white"
              onClick={() => signOut()}
            >
              <SignOut size={32} color="#ffffff" />
              Sair
            </Button>
            <Button
              className="border-white bg-black text-xl text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Nova Transferência
            </Button>
          </div>
        </nav>
        <div className="mt-[-4.5rem] flex gap-8">
          <DashboardCard
            title="Entradas"
            icon={<ArrowCircleUp size={32} color="#96d35f" />}
            value={totalCreditedValue}
          />
          <DashboardCard
            title="Saídas"
            icon={<ArrowCircleDown size={32} color="#e83f5b" />}
            value={totalDebitedValue}
          />
          <DashboardCard
            title="Total"
            icon={<CurrencyDollar size={32} color="#f5ec00" />}
            value={user.account.balance}
          />
        </div>
        <div className="mt-12 flex flex-col gap-2">
          <div className="grid w-full grid-cols-4 justify-around text-left">
            <span className="px-8 text-xl text-brand-gray-800">Usuário</span>
            <span className="px-8 text-xl text-brand-gray-800">Valor</span>
            <div className="relative flex px-8">
              <span className=" text-xl text-brand-gray-800">Tipo</span>
              <FilterMenu setFilter={setFilter} />
            </div>
            <span className="px-8 text-xl text-brand-gray-800">Data</span>
          </div>
          <table className="flex w-[64rem] flex-col gap-4">
            <tbody className="flex flex-col gap-2">
              {filter === "all"
                ? transactions.map((transaction) => {
                    return (
                      <tr
                        className="grid w-full grid-cols-4 justify-around rounded bg-white"
                        key={transaction.id}
                      >
                        <td className="py-4 px-8 text-xl text-brand-gray-400">
                          {user.username}
                        </td>
                        <td className="py-4 px-8 text-brand-gray-400">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(transaction.value)}
                        </td>
                        <td className="py-4 px-8 text-brand-gray-400">
                          {transaction.creditedAccount === user.account.id
                            ? "Entrada"
                            : "Saída"}
                        </td>
                        <td className="py-4 px-8 text-brand-gray-400">
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(transaction.createdAt)
                          )}
                        </td>
                      </tr>
                    );
                  })
                : filteredTransactions.map((transaction) => {
                    return (
                      <tr
                        className="grid w-full grid-cols-4 justify-around rounded bg-white"
                        key={transaction.id}
                      >
                        <td className="py-4 px-8 text-xl text-brand-gray-400">
                          {user.username}
                        </td>
                        <td className="py-4 px-8 text-brand-gray-400">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(transaction.value)}
                        </td>
                        <td className="py-4 px-8 text-brand-gray-400">
                          {transaction.creditedAccount === user.account.id
                            ? "Entrada"
                            : "Saída"}
                        </td>
                        <td className="py-4 px-8 text-brand-gray-400">
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(transaction.createdAt)
                          )}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

function DashboardCard({ title, icon, value }: DashboardCardProps) {
  return (
    <div className="flex w-80 flex-col gap-6 rounded bg-white p-6">
      <div className="flex items-center justify-between">
        <span className=" text-base text-brand-gray-400">{title}</span>
        {icon}
      </div>
      <strong className="text-3xl text-gray-600">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)}
      </strong>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx, true);
  const response = await apiClient.get("/users");

  const user = response.data;

  return {
    props: { user },
  };
});
