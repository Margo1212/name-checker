import axios from 'axios'
import { FormEventHandler, useState } from 'react'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'
import SearchResult from './SearchResult'
import Title from './Title'
import History from './History'
import HistoryButton from './HistoryButton'
import NoResultsFound from '../NoResultsFound'

const Header = () => {
    const [historyOpen, setHistoryOpen] = useState(false)
    const [checkedName, setCheckedName] = useState('')
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')
    const [displayName, setDisplayName] = useState('')


   
      
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
          ).catch(() => {
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
        
    }
  

  const handleClick: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if(checkedName) {
        getApi(checkedName)
        pushNameToLocalStorage(checkedName)
        
    }
  };

  const bla = () => {
    setHistoryOpen(!historyOpen)
  }


  


  return (
    <>
    <div className='h-screen w-full'>
      <div className="w-full h-80 border rounded-b-[50px] flex flex-col justify-center items-center p-10 bg-background">
        <HistoryButton onClick={bla} />
        <Title>Check your name</Title>
        
        <form className='flex flex-row' onSubmit={handleClick}>
            <SearchInput placeholder='Enter name' onChange={handleChange} />
            <SearchButton />
        </form>
        
        </div>
        {displayName ? <SearchResult gender={gender} nationality={nationality} displayName={displayName} /> : <NoResultsFound />}

        <div className={`${historyOpen ?  'block' : 'hidden'} absolute top-0 right-0 flex flex-col min-h-screen p-2 bg-primary`}>
          <button onClick={() => setHistoryOpen(!historyOpen)}>X</button>
        <History  />
        </div>
        
        </div>
    </>
  )
}

export default Header