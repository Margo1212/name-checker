import axios from 'axios'
import React, { FormEventHandler, useState } from 'react'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'
import Title from './Title'

const Header = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')

    const getApi = (name1: string) => {
        const endpoints = [
            `https://api.nationalize.io?name=${name1}`,
            `https://api.genderize.io?name=${name1}`,  
          ];
    
          axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(axios.spread(({data: nationality}, {data: gender}) => {
            setGender(gender.gender)
            setNationality(nationality.country[0].country_id)
          })
        )
    }

   

  const handleChange = (value: string) => {
    setName(value)
  }

    const pushToLocalStorage = () => {
        let history = [];
        history = JSON.parse(localStorage.getItem('name') || '');
        history.push(name)
        localStorage.setItem("name", JSON.stringify(history)) 
    }
  

  const handleClick: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    pushToLocalStorage()
    getApi(name)
  };

  
  return (
    <div>
        <Title />
        <form onSubmit={handleClick}>
            <SearchInput onChange={handleChange} />
            <SearchButton />
        </form>
        <h1>{name}</h1>
        {gender}
        {nationality}
        
    </div>
  )
}

export default Header