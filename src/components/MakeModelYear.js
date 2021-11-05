import React, { useState, useEffect } from 'react'
import {
  SEARCH_MAKES_QUERY,
  queryFetch,
  SEARCH_MODELS_QUERY,
  SEARCH_YEAR_QUERY,
} from '../constants/constants'

const MakeModelYear = () => {
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])

  //Handle change in Makes List
  const handleMakeChange = (e) => {
    setModels([])
    setYears([])
    const make_id = e.target.value
    fetchSearchModels(make_id)
  }

  //Handle change in Model List
  const handleModelChange = (e) => {
    setYears([])
    const model_id = e.target.value
    fetchSearchYears(model_id)
  }

  //Fetching Search Makes
  const fetchSearchMakes = async () => {
    // Call API
    setMakes([])
    await queryFetch(SEARCH_MAKES_QUERY).then((data) => {
      const searchMakesResult = data.data.uvdb.search_uvdb_makes.items
      setMakes(searchMakesResult)
    })
  }

  //Fetching Search Model
  const fetchSearchModels = async (make_id) => {
    setModels([])
    await queryFetch(SEARCH_MODELS_QUERY, { make_id: make_id }).then((data) => {
      const modelData = data.data.uvdb.search_uvdb_models.items
      setModels(modelData)
    })
  }

  //Fetching Search Makes
  const fetchSearchYears = async (model_id) => {
    setYears([])
    // Call API
    await queryFetch(SEARCH_YEAR_QUERY, { model_id: model_id }).then((data) => {
      const searchYearsResult = data.data.uvdb.search_uvdb_years.items
      setYears(searchYearsResult)
    })
  }

  useEffect(() => {
    fetchSearchMakes()
  }, [])

  return (
    <div className="App">
      <h1>Makes - Model - Years</h1>
      <select id="makes-select" onChange={handleMakeChange}>
        <option defaultValue>Makes...</option>
        {makes.map((e) => (
          <option value={e.id}>{e.name}</option>
        ))}
      </select>
      <select id="model-select" onChange={handleModelChange}>
        <option value="1" hidden>
          {years.length === 1 ? years[0].name : 'Models'}
        </option>

        {models.map((e) => (
          <option value={e.id}>{e.name}</option>
        ))}
      </select>
      <select id="year-select">
        <option defaultValue hidden>
          {years.length === 1 ? years[0].name : 'Years'}
        </option>
        {years.map((e) => (
          <option value={e.id}>{e.name}</option>
        ))}
      </select>
    </div>
  )
}

export default MakeModelYear
