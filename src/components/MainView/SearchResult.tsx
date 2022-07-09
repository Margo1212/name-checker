import React from "react";

type SearchResultProps = {
  displayName: string;
  gender: string;
  nationality: string;
};

const SearchResult = ({
  displayName,
  gender,
  nationality,
}: SearchResultProps) => {
  const convertCountryCode = (countryCode: string) => {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(countryCode);
  };
  return (
    <>
      <div className="w-full h-80 py-10 px-96 flex flex-col justify-around ">
        <h2 className="text-4xl font-bold">{displayName}</h2>
        <p className="text-2xl">Gender: {gender}</p>
        <p className="text-2xl">
          Nationality: {convertCountryCode(nationality)}
        </p>
      </div>
    </>
  );
};

export default SearchResult;
