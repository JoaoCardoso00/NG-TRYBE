import { ReactNode, useState } from "react";
import { User } from "../contexts/AuthContext";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupApiClient } from "../services/api";
import { Button } from "../components/Button";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { TransactionModal } from "../components/TransactionModal";

interface dashboardProps {
  user: User;
}

export default function Dashboard({ user }: dashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TransactionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <main className="flex h-screen w-screen flex-col items-center bg-brand-gray-100">
        <nav className="flex h-64 w-screen items-start justify-around bg-black">
          <img
            src="/imgs/logoDark.png"
            alt="ng-cash logo"
            className="h-[8rem] w-[22rem]"
          />
          <div className="mt-12 flex w-[25rem] gap-8">
            <Button className="border-white bg-black text-base text-white">
              Logout
            </Button>
            <Button
              className="border-white bg-black text-base text-white"
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
            value={2000}
          />
          <DashboardCard
            title="Saídas"
            icon={<ArrowCircleDown size={32} color="#e83f5b" />}
            value={2000}
          />
          <DashboardCard
            title="Total"
            icon={<CurrencyDollar size={32} color="#f5ec00" />}
            value={2000}
          />
        </div>
        <div className="mt-12 flex flex-col gap-2">
          <div className="grid w-full grid-cols-4 justify-around text-left">
            <span className="px-8 text-xl text-brand-gray-800">Usuário</span>
            <span className="px-8 text-xl text-brand-gray-800">Valor</span>
            <span className="px-8 text-xl text-brand-gray-800">Tipo</span>
            <span className="px-8 text-xl text-brand-gray-800">Data</span>
          </div>
          <table className="flex w-[64rem] flex-col gap-4">
            <tbody className="flex flex-col gap-2">
              <tr className="grid w-full grid-cols-4 justify-around rounded bg-white">
                <td className="py-4 px-8 text-xl text-brand-gray-400">
                  Casanova
                </td>
                <td className="py-4 px-8 text-brand-gray-400">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(2000)}
                </td>
                <td className="py-4 px-8 text-brand-gray-400">Entrada</td>
                <td className="py-4 px-8 text-brand-gray-400">
                  {new Intl.DateTimeFormat("pt-BR").format(new Date())}
                </td>
              </tr>
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
  // TODO: Get user data from API
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/users");

  const user = response.data;

  return {
    props: { user },
  };
});
