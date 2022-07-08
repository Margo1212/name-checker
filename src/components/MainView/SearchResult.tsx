

type SearchResultProps = {
    displayName: string;
    gender: string;
    nationality: string
}

const SearchResult = ({displayName, gender, nationality} : SearchResultProps) => {

    const convertCountryCode = (countryCode:string) => {
        const regionNames = new Intl.DisplayNames(
            ['en'], {type: 'region'}
          );
          return regionNames.of(countryCode)
      };
    return (
        <>
        <h1>{displayName}</h1>
        <h1>{gender}</h1>
        <h1>{convertCountryCode(nationality)}</h1>
        </>
    )
  }

  export default SearchResult