import { useContext } from "react";
import { UserInfosContext } from "../../../../contexts/UserInfosContext";
import { PiClipboard } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";

export function PostCard() {
  const { issues } = useContext(UserInfosContext);

  return (
    <>
      {issues.length === 0 ? (
        <p className="flex flex-col items-center text-lag font-bold text-color-base-subtitle gap-3">
          <PiClipboard className="size-10" />
          Nenhum post encontrado
        </p>
      ) : (
        <section className="grid grid-cols-2 gap-8 items-center justify-center mb-52">
          {issues.map((issue) => (
            <NavLink to={`/issue/${issue.number}`} key={issue.number}>
              <div className="w-[26rem] h-[16.25rem] flex flex-col gap-5 bg-color-base-post text-white p-8 rounded-[0.625rem] cursor-pointer">
                <header className="flex gap-4 justify-between">
                  <div className="max-w-[17rem] text-xl">
                    <h1>{issue.title}</h1>
                  </div>
                  <div>
                    <span className="text-sm text-color-base-span">
                      {formatDate(issue.created_at)}
                    </span>
                  </div>
                </header>
                <main className="max-w-[22rem] text-color-base-text  max-h-[7rem]">
                  {issue.body.length > 300 && (
                    <p className="line-clamp-5">{issue.body}</p>
                  )}
                </main>
              </div>
            </NavLink>
          ))}
        </section>
      )}
    </>
  );
}
