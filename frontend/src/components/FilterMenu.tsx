import { Menu } from "@headlessui/react";
import { CaretDown } from "phosphor-react";
import { SetStateAction } from "react";
import { Button } from "./Button";

interface FilterMenuProps {
  setFilter: (filter: SetStateAction<"all" | "credited" | "debited">) => void;
}

export function FilterMenu({ setFilter }: FilterMenuProps) {
  return (
    <Menu>
      <Menu.Button>
        <CaretDown size={24} />
      </Menu.Button>
      <Menu.Items className="absolute top-8 flex w-56 flex-col gap-2 rounded-xl border-2 border-black bg-white p-4">
        <Menu.Item>
          <Button onClick={() => setFilter("all")}>Todas</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => setFilter("credited")}>Entradas</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => setFilter("debited")}>Saídas</Button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
