import React from "react";
import { RiStarSFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { IRepository } from "../../Home";

const Repository: React.FC<IRepository> = ({
  created_at,
  description,
  forks_count,
  name,
  stargazers_count,
  watchers_count,
}) => {
  return (
    <div className="flex flex-col p-4 gap-4 max-w-[328px] w-[328px] min-w-[328px] min-h-[200px] h-[200px] max-h-[200px] border-[1px] overflow-hidden border-blue-marine rounded-xl cursor-pointer">
      <div className="w-full h-full flex flex-col gap-3">
        <h1 className="font-semibold">{name}</h1>
        <h2 className="text-sm font-normal overflow-hidden max-h-[60px] text-ellipsis">{description}</h2>
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        <div className="w-auto h-[25px] flex items-center gap-3 px-2">
          <RiStarSFill className="h-4 w-4" />
          {stargazers_count}
        </div>
        <div className="w-auto h-[25px] flex items-center gap-3 px-2">
          <FaEye className="h-4 w-4" />
          {watchers_count}
        </div>
        <div className="w-auto h-[25px] flex items-center gap-3 px-2">
          <FaCodeFork className="h-4 w-4" />
          {forks_count}
        </div>
      </div>
      <span className="text-sm text-blue-marine font-light">
        Criado em {new Date(created_at || "").toLocaleDateString("pt-br", { dateStyle: "long" })}
      </span>
    </div>
  );
};

export default Repository;
