import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { debounce } from 'lodash'

import SelectYear from '../components/Select/Select'
import { Search } from '../components/Input/Input'
import Table from '../components/Table/Table'
import './style.scss'

const columns = [
  { label: 'League name', field: 'name' },
  { label: 'Country', field: 'area.name' },
  { label: 'Start of the season', field: 'currentSeason.startDate' },
  { label: 'End of the season', field: 'currentSeason.endDate' },
]

const Leagues = props => {
  const history = useHistory()

  const [year, setYear] = useState(props.year || '')
  const [search, setSearch] = useState(props.search || '')

  const years = props.leagues
    .reduce((acc, league) => {
      if (league.currentSeason) {
        const yyyy = league.currentSeason.startDate.split('-')[0]
        !acc.includes(yyyy) && acc.push(yyyy)
      }

      return acc
    }, []).sort((a, b) => a > b ? -1 : 1)

  const data = props.leagues
    .filter(league => !search || league.name.toLowerCase().includes(search))
    .filter(league => !year || (league.currentSeason && league.currentSeason.startDate.includes(year)))

  useEffect(() => {
    const query = [
      search && `search=${search}`,
      year && `year=${year}`
    ].filter(Boolean).join('&')

    history.push('/leagues' + (query && `?${query}`))
  }, [search, year])

  return (
    <div className="leagues">
      <h1>League list</h1>

      <div className="leagues-filters">
        <Search value={search} onChange={debounce(setSearch, 500)} />

        <SelectYear
          label="Start of the season"
          years={years}
          selected={year}
          onSelect={setYear}
        />
      </div>

      <Table
        data={data}
        columns={columns}
        loading={props.loading}
      />
    </div>
  )
}

export default Leagues