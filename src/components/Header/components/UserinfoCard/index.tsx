import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithub, FaUserFriends } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { useContext } from "react";
import { UserInfosContext } from "../../../../contexts/UserInfosContext";
import { NavLink } from "react-router-dom";

export function UserInfoCard() {
  const { user } = useContext(UserInfosContext);

  if (!user) {
    return <p>loading</p>;
  }

  return (
    <section className="pl-10 pr-8 py-8 flex items-center -mt-20 bg-color-base-post rounded-[0.675rem] w-[54rem] absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
      <header className="flex justify-between gap-16 rounded-md">
        <>
          <img
            src={user.avatar_url}
            alt="img"
            className="size-36 rounded-[0.5rem]"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-color-base-title">
              {user.name}
            </h1>
            <p className="  text-color-base-text text-base">{user.bio}</p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex gap-2 items-center">
                <FaGithub className="size-[1.125rem] text-color-base-lable" />
                <p className="text-color-base-subtitle">{user.login}</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaUserFriends className="size-[1.125rem] text-color-base-lable" />
                <p className="text-color-base-subtitle">{user.followers}</p>
              </div>
              <div className="flex gap-2 items-center">
                {!user.company ? (
                  <>
                    <FaBuilding className="size-[1.125rem] text-color-base-lable" />
                    <p className="text-color-base-subtitle">
                      Não possui empresa
                    </p>
                  </>
                ) : (
                  <>
                    <FaBuilding className="size-[1.125rem] text-color-base-lable" />
                    <p className="text-color-base-subtitle">{user.company}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <NavLink
                className="group flex items-center gap-2 text-color-blue cursor-pointer relative"
                to={user.html_url}
              >
                <p className="text-xs font-bold">GITHUB</p>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="size-3"
                />
                <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </div>
          </div>
        </>
      </header>
    </section>
  );
}