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
    const uniqueData = [
      ...new Set<string>(data.map((item: string) => item.toLowerCase())),
    ];
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
          .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
          .map((item, idx) => (
            <div
              className="text-white text-sm rounded-md bg-background m-2 p-1 bg-opacity-50"
              key={idx}
            >
              <p className="capitalize">{item}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default History;
