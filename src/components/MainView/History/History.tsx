import React, { useEffect, useState } from "react";
import SearchInput from "../Search/SearchInput";
import Title from "../Title";

const History = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const getDataFromLocaleStorage = () => {
    if (localStorage.getItem("name") === null) {
      localStorage.setItem("name", "[]");
    }
    const data = JSON.parse(localStorage.getItem("name") || "");
    const uniqueData = data
      .sort()
      .filter((item: string, index: number) => data.indexOf(item) === index);
    setHistory(uniqueData);
  };

  useEffect(() => {
    getDataFromLocaleStorage();
    const interval = setInterval(() => {
      getDataFromLocaleStorage();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <div className="self-center">
        <Title>History</Title>
      </div>
      <SearchInput placeholder="Search" onChange={handleChange} value={query} />

      <div>
        {history
          .filter((item) => item?.includes(query))
          .map((item, idx) => (
            <div
              className="text-white text-sm rounded-md bg-background m-2 p-1 bg-opacity-50"
              key={idx}
            >
              {item}
            </div>
          ))}
      </div>
    </>
  );
};

export default History;
