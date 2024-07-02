import { useContext } from "react";
import { UserInfosContext } from "../../../../contexts/UserInfosContext";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInput = z.infer<typeof searchFormSchema>;

export function FormSearch() {
  const { issues, fetchIssuesInfo } = useContext(UserInfosContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  function handleSearchIssues(data: SearchFormInput) {
    fetchIssuesInfo(data.query);
    reset();
  }

  return (
    <section className="flex flex-col items-center w-full">
      <header className="flex items-center justify-between w-[54rem]">
        <div>
          <p className="text-color-base-subtitle text-lg">Publicações</p>
        </div>
        <div>
          <p className="text-color-base-span text-sm">
            {issues?.length} publicações
          </p>
        </div>
      </header>
      <form onSubmit={handleSubmit(handleSearchIssues)}>
        <input
          disabled={isSubmitting}
          type="text"
          className="mt-3 w-[54rem] px-4 py-3 bg-color-base-input flex items-center border border-color-base-border rounded-md outline-none text-white placeholder:text-color-base-lable"
          placeholder="Buscar conteúdo"
          {...register("query")}
        />
      </form>
    </section>
  );
}
