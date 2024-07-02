import { FormSearch } from "./components/FormSearch";
import { PostCard } from "./components/PostCard";
import { UserInfoCard } from "./components/UserInfoCard";

export function Home() {
  return (
    <section className="flex flex-col items-center gap-16 w-full">
      <UserInfoCard />
      <FormSearch />
      <PostCard />
    </section>
  );
}
