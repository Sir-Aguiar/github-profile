import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import Repository from "./components/Repository/Repository";
import Loader from "./components/Loader/Loader";

export interface IUser {
  followers: number;
  following: number;
  public_repos: number;
  login: string;
  avatar_url: string;
  name: string;
  company: string;
  location: string;
  bio: string;
  created_at: string;
  html_url: string;
}

export interface IRepository {
  name: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  created_at: string;
}

const Home: React.FC = () => {
  const URL = "https://api.github.com/users";
  const [userData, setUserData] = useState<IUser | null>(null);
  const [useRepos, setUserRepos] = useState<IRepository[] | null>(null);

  const [isUserLoading, setUserLoading] = useState(false);
  const [isRepoLoading, setRepoLoading] = useState(false);

  const setData = async (name = "sir-aguiar") => {
    setUserLoading(true);
    setRepoLoading(true);
    try {
      const response = await axios.get(`${URL}/${name}`);
      setUserData(response.data);
      const repos = await axios.get(`${response.data.repos_url}?per_page=100`);
      const lastest = repos.data.sort(
        (a: IRepository, b: IRepository) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setUserRepos([lastest[0], lastest[1], lastest[2]]);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUserLoading(false);
      setRepoLoading(false);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className="home-page">
      <NavBar setData={setData} />
      <header className="home-header">
        {isUserLoading ? (
          <Loader />
        ) : (
          <>
            <img className="profile-pic" src={userData?.avatar_url || ""}></img>
            <div className="profile-description">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-xl">{userData?.name}</h1>
                <h2 className="px-2 font-light">@{userData?.login}</h2>
                <h3 className="w-full text-sm">{userData?.bio}</h3>
              </div>
              <div className="w-full flex flex-col items-start gap-3">
                {userData?.company && (
                  <div className="flex items-center gap-3">
                    <FaBuilding className="text-blue-marine" /> {userData?.company}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <FaLocationDot className="text-blue-marine" /> {userData?.location}
                </div>
              </div>
              <a
                className="text-[12px] underline underline-offset-2 text-blue-marine font-light"
                href={userData?.html_url}
                referrerPolicy="no-referrer"
                target="_blank"
              >
                Ver perfil
              </a>
            </div>
            <div className="profile-infos">
              <div className="w-full h-[50px] flex items-center justify-center gap-2">
                <div className="w-[156px] h-full flex flex-col items-center gap-1 text-[12px]">
                  <span className="text-sm font-medium">{userData?.followers}</span>
                  <span>Followers</span>
                </div>
                <div className="h-3/4 w-[1px] bg-blue-marine"></div>
                <div className="w-[156px] h-full flex flex-col items-center gap-1 text-[12px]">
                  <span className="text-sm font-medium">{userData?.following}</span>
                  <span>Following</span>
                </div>
                <div className="h-3/4 w-[1px] bg-blue-marine"></div>
                <div className="w-[156px] h-full flex flex-col items-center gap-1 text-[12px]">
                  <span className="text-sm font-medium">{userData?.public_repos}</span>
                  <span>Repositories</span>
                </div>
              </div>
              <span className="text-sm text-blue-marine font-light">
                Inscrito desde:{" "}
                {new Date(userData?.created_at || "").toLocaleDateString("pt-br", { dateStyle: "long" })}
              </span>
            </div>
          </>
        )}
      </header>

      <main className="home-main">
        {isRepoLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center">Últimas Publicações</h1>
            <div className="w-full h-auto flex flex-wrap gap-6 justify-between">
              {useRepos?.map((repository, index) => (
                <Repository key={index} {...repository} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
