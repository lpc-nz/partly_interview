import React, { useState, useEffect } from 'react'
import { queryFetch, SEARCH_MODELS_QUERY } from '../constants/constants'
import {
  SEARCH_REVERSE_YEAR_QUERY,
  SEARCH_REVERSE_MAKES_QUERY,
} from '../constants/constantsReverse'

const YearMakeModel = () => {
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])

  //Handle change in Makes List
  const handleMakeChange = (e) => {
    setModels([])
    const make_id = e.target.value
    fetchSearchModels(make_id)
  }

  //Handle change in Model List
  const handleYearChange = (e) => {
    setMakes([])
    setModels([])
    const year_id = parseInt(e.target.value)
    fetchSearchMakes(year_id)
  }

  //Fetching Search Makes
  const fetchSearchMakes = async (year_id) => {
    // Call API
    await queryFetch(SEARCH_REVERSE_MAKES_QUERY, { year_id: year_id }).then(
      (data) => {
        const searchMakesResult = data.data.uvdb.search_uvdb_makes.items
        setMakes(searchMakesResult)
      }
    )
  }

  //Fetching Search Model
  const fetchSearchModels = async (make_id) => {
    await queryFetch(SEARCH_MODELS_QUERY, { make_id: make_id }).then((data) => {
      const modelData = data.data.uvdb.search_uvdb_models.items
      setModels(modelData)
    })
  }

  //Fetching Search Makes
  const fetchSearchYears = async () => {
    setYears([])
    // Call API
    await queryFetch(SEARCH_REVERSE_YEAR_QUERY).then((data) => {
      const searchYearsResult = data.data.uvdb.search_uvdb_years.items
      setYears(searchYearsResult)
    })
  }

  useEffect(() => {
    fetchSearchYears()
  }, [])

  return (
    <div className="App">
      <h1>Years - Makes - Model</h1>
      <select id="year-select" onChange={handleYearChange}>
        <option defaultValue hidden>
          Years
        </option>
        {years.map((e) => (
          <option value={e.id}>{e.name}</option>
        ))}
      </select>
      <select id="makes-select" onChange={handleMakeChange}>
        <option defaultValue>
          {makes.length === 1 ? years[0].name : 'Makes....'}
        </option>
        {makes.map((e) => (
          <option value={e.id}>{e.name}</option>
        ))}
      </select>
      <select id="model-select">
        <option value="1" hidden>
          {models.length === 1 ? models[0].name : 'Models'}
        </option>

        {models.map((e) => (
          <option value={e.id}>{e.name}</option>
        ))}
      </select>
    </div>
  )
}

export default YearMakeModel
