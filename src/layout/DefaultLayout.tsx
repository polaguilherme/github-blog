import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { Header } from "../components/Header";

interface DefaultLayoutProps {
  children?: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center px-72 font-font-nunito">
        <Outlet />
        {children}
      </main>
    </>
  );
}
