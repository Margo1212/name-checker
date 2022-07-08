import axios from 'axios'
import { FormEventHandler, useState } from 'react'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'
import SearchResult from './SearchResult'
import Title from './Title'
import History from './History'

const Header = () => {
    const [checkedName, setCheckedName] = useState('')
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(false)

   
      
    const getApi = (name: string) => {
        const endpoints = [
            `https://api.nationalize.io?name=${name}`,
            `https://api.genderize.io?name=${name}`,  
          ];
    
          axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(axios.spread(({data: nationality}, {data: gender}) => {
              setDisplayName(nationality.name)
              setGender(gender.gender)
              setNationality(nationality.country[0].country_id)
          })
        ).catch((err) => {
          setError(err)
          setDisplayName('')
          setGender('')
          setNationality('')
        })
    }


  const handleChange = (value: string) => {
    setCheckedName(value)
  }

    const pushNameToLocalStorage = (name: string) => {
        if (localStorage.getItem('name') === null) {
          localStorage.setItem("name", '[]')
        }
        
        let history = JSON.parse(localStorage.getItem('name') || '');
        history.push(name)
        localStorage.setItem("name", JSON.stringify(history))
        window.location.reload()
    }
  

  const handleClick: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if(checkedName) {
        getApi(checkedName)
        pushNameToLocalStorage(checkedName)
    }
    return error
  };
  


  return (
    <>
        <Title>Check your name</Title>
        <form onSubmit={handleClick}>
            <SearchInput placeholder='Enter name' onChange={handleChange} />
            <SearchButton />
        </form>
        {displayName ? <SearchResult gender={gender} nationality={nationality} displayName={displayName} /> : `No results`}

        <History />
    </>
  )
}

export default Header