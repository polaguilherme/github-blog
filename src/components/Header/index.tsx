import headerCoverBg from "../../assets/Cover.png";

export function Header() {
  return (
    <header className="relative">
      <img src={headerCoverBg} alt="headerCoverBg" className="w-full" />
    </header>
  );
}
