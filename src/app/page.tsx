import Image from "next/image";
import Dashboard from "./dashboard/page";
import FoodApp from "./dashboard/page";
import MainLayout from "./components/MainLayout";
import Auth from "@/firebase/Auth";
import Halaman from "./pages/main/index/page";

export default function Home() {
  return (
    <Halaman />
    // <MainLayout/>
    // <Auth />
  );
}
