import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { debounce } from 'lodash'

import SelectYear from '../../components/Select/Select'
import { Search } from '../../components/Input/Input'
import Table from '../../components/Table/Table'
import '../style.scss'

const columns = [
  { label: 'Team name', field: 'name' },
  { label: 'Country', field: 'area.name' },
  { label: 'Founded', field: 'founded' },
  { label: 'Address', field: 'address' },
]

const Teams = props => {
  const history = useHistory()

  const [year, setYear] = useState(props.year || '')
  const [search, setSearch] = useState(props.search || '')

  const years = props.teams
    .reduce((acc, team) => {
      const yyyy = team.founded
      yyyy && !acc.includes(yyyy) && acc.push(yyyy)

      return acc
    }, []).sort((a, b) => a > b ? -1 : 1)

  const data = props.teams
    .filter(team => !search || team.name.toLowerCase().includes(search))
    .filter(team => !year || team.founded == year)

  useEffect(() => {
    const query = [
      search && `search=${search}`,
      year && `year=${year}`
    ].filter(Boolean).join('&')

    history.push('/teams' + (query && `?${query}`))
  }, [search, year])

  return (
    <div className="teams">
      <h1>Team list</h1>

      <div className="teams-filters">
        <Search value={search} onChange={debounce(setSearch, 500)} />

        <SelectYear
          label="Founded"
          years={years}
          selected={year}
          onSelect={setYear}
        />
      </div>

      <Table
        data={data}
        columns={columns}
        loading={props.loading}
        onRowClick={team => history.push('/teams/' + team.id)}
      />
    </div>
  )
}

export default Teams