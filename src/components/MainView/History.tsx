import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import Title from './Title'

const History = () => {
    const [history, setHistory] = useState<string[]>([])
    const [query, setQuery] = useState('')

    const getDataFromLocaleStorage = () => {
      if (localStorage.getItem('name') === null) {
        localStorage.setItem("name", '[]')
      }
        const data = JSON.parse(localStorage.getItem("name") || '')
        const uniqueData =  data.sort().filter((item: string, index: number) =>  data.indexOf(item.toLowerCase()) === index
      );
        setHistory(uniqueData)
    }
useEffect(() => {
  getDataFromLocaleStorage()
}, [query])
    
  
    const handleChange = (value: string) => {
      setQuery(value)
    }
  
    
  return (
    <>
    <Title>History</Title>
     <SearchInput placeholder='Search' onChange={handleChange} value={query} />
     
      <div >
        {history.filter(b => b?.includes(query)).map((d, idx) => <p key={idx}>{d}</p>)}
      </div>
      
    </>
  )
}

export default History