import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React, { FormEventHandler, useState } from "react";
import SearchButton from "./Search/SearchButton";
import SearchInput from "./Search/SearchInput";
import SearchResult from "./SearchResult";
import Title from "./Title";
import History from "./History/History";
import HistoryButton from "./History/HistoryButton";
import NoResultsFound from "../NoResultsFound";

const Header = () => {
  const [historyOpen, setHistoryOpen] = useState(true);
  const [checkedName, setCheckedName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loader, setLoader] = useState(false);

  const getApi = (name: string) => {
    const endpoints = [
      `https://api.nationalize.io?name=${name}`,
      `https://api.genderize.io?name=${name}`,
    ];
    setLoader(true)

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread(({ data: nationality }, { data: gender }) => {
          setDisplayName(nationality.name);
          setGender(gender.gender);
          setNationality(nationality.country[0].country_id);
          setLoader(false)
        })
      )
      .catch(() => {
        setDisplayName("");
        setGender("");
        setNationality("");
      });
  };

  const handleChange = (value: string) => {
    setCheckedName(value);
  };

  const pushNameToLocalStorage = (name: string) => {
    if (localStorage.getItem("name") === null) {
      localStorage.setItem("name", "[]");
    }

    const history = JSON.parse(localStorage.getItem("name") || "");
    history.push(name);

    localStorage.setItem("name", JSON.stringify(history));
  };

  const handleClick: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (checkedName) {
      getApi(checkedName);
      pushNameToLocalStorage(checkedName);
    }
  };

  const openHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  return (
    <>
      <div className="h-screen w-screen border-none overflow-hidden">
        <div className="w-full h-80 border drop-shadow-2xl rounded-b-[50px] flex flex-col justify-center items-center p-10 bg-background">
          <HistoryButton onClick={openHistory} />
          <Title>Check your name</Title>


          <form className="flex flex-row" onSubmit={handleClick}>
            <SearchInput loader={loader} placeholder="Enter name" onChange={handleChange} />
            <SearchButton />
          </form>
        </div>
        
        {displayName  ?
        (<SearchResult
          gender={gender}
          nationality={nationality}
          displayName={displayName}
        />
      )
        
           : <NoResultsFound />  }
           


        <div
          className={`${
            historyOpen ? "block" : "hidden"
          } transition-opacity duration-500 ease-out absolute top-0 right-0 flex flex-col min-h-screen p-2 bg-primary`}
        >
          <button
            className="text-background absolute top-5 right-5 text-4xl"
            onClick={() => setHistoryOpen(!historyOpen)}
          >
            <AiOutlineCloseCircle />
          </button>
          <History />
        </div>
      </div>
    </>
  );
};

export default Header;
