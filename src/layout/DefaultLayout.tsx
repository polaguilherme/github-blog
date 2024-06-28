import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <div className="px-72 font-font-nunito">
        <Outlet />
        {children}
      </div>
    </>
  );
}
