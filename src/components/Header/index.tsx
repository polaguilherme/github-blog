import headerCoverBg from "../../assets/Cover.png";

export function Header() {
  return (
    <header className="w-full">
      <img src={headerCoverBg} alt="Header Background" className="w-full" />
    </header>
  );
}
