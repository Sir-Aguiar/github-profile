import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { FaSearch } from "react-icons/fa";

interface IProps {
  setData: (name?: string) => Promise<void>;
}

const NavBar: React.FC<IProps> = ({ setData }) => {
  const [userName, setUserName] = useState("");

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setData(userName);
    }
  };
  const onClick = () => {
    setData(userName);
  };
  return (
    <nav className={styles.nav_container}>
      <div className={styles.search}>
        <FaSearch
          className="text-blue-marine h-4 w-4 absolute right-5 cursor-pointer hover:brightness-90 top-1/2 -translate-y-1/2"
          onClick={onClick}
        />
        <input
          type="text"
          placeholder="Usuário"
          onKeyDown={onEnter}
          onChange={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
