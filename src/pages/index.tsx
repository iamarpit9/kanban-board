import KanbanBoard from "@/Components/KanbanBoard";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <KanbanBoard />
    </>
  );
}
