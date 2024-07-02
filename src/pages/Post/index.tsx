import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  FaCalendarDay,
  FaChevronLeft,
  FaComment,
  FaGithub,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IssuesInfo, UserInfosContext } from "../../contexts/UserInfosContext";
import { formatDate } from "../../utils/formatDate";
import { CgSpinner } from "react-icons/cg";

export function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchIssueByNumber } = useContext(UserInfosContext);

  const [issue, setIssue] = useState<IssuesInfo | null>(null);

  useEffect(() => {
    const getIssue = async () => {
      const fetchedIssue = await fetchIssueByNumber(Number(id));
      setIssue(fetchedIssue);
    };

    if (id) {
      getIssue();
    }
  }, [id, fetchIssueByNumber]);

  function handleNavigate() {
    navigate(-1);
  }

  if (!issue) {
    return (
      <section className="w-[54rem] px-8 py-8 bg-color-base-profile flex items-center justify-center -mt-11 rounded-[0.625rem]   gap-5">
        <CgSpinner className="text-color-blue text-5xl animate-spin " />
      </section>
    );
  }

  return (
    <div>
      <section className="w-[54rem] px-8 py-8 bg-color-base-profile -mt-11 rounded-[0.625rem] flex flex-col gap-5">
        <header className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 uppercase text-color-blue cursor-pointer"
            onClick={handleNavigate}
          >
            <FaChevronLeft className="size-3" />
            <p className="text-xs">Voltar</p>
          </div>
          <div>
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-color-blue cursor-pointer relative"
            >
              <p className="text-xs font-bold">VER NO GITHUB</p>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="size-3"
              />
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </header>
        <section>
          <h1 className="text-2xl font-bold text-color-base-title">
            {issue.title}
          </h1>
          <div className="flex items-center gap-6 mt-6">
            <div className="flex gap-2 items-center">
              <FaGithub className="size-[1.125rem] text-color-base-lable" />
              <p className="text-color-base-subtitle">{issue.user.login}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaCalendarDay className="size-[1.125rem] text-color-base-lable" />
              <p className="text-color-base-subtitle">
                {formatDate(issue.created_at)}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <FaComment className="size-[1.125rem] text-color-base-lable" />
              <p className="text-color-base-subtitle">{issue.comments}</p>
            </div>
          </div>
        </section>
      </section>
      <main className="max-w-[54rem] mt-10 text-white font-bold mb-32">
        <ReactMarkdown
          children={issue.body}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={dracula as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {issue.body}
                </code>
              );
            },
            h1: ({ node, ...props }) => (
              <h1
                className="text-2xl font-bold text-color-blue mb-4"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl font-bold text-color-base-subtitle mb-3"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-lg font-bold text-color-base-text mb-2"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-sm font-bold mb-2 text-color-base-text"
                {...props}
              />
            ),
          }}
        />
      </main>
    </div>
  );
}
