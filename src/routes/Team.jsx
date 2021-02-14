import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import PageLayout from '../layouts/page'
import Loader from '../components/Loader/Loader'
import TeamPage from '../pages/Teams/Team/Team'

const Team = props => {
  const { id } = useParams()
  const history = useHistory()
  const [range, setRange] = useState([new Date('2020-01-01'), new Date()]);
  const { team, loading } = props.RootStore

  useEffect(() => {
    team.id != id && props.RootStore.getTeamInfo(id)
  }, [])

  useEffect(() => {
    const [from, to] = range
    const query = [
      from && `dateFrom=${from.toLocaleDateString("sv-SE")}`,
      to && `dateTo=${to.toLocaleDateString("sv-SE")}`
    ].filter(Boolean).join('&')

    history.push(`/teams/${id}${query && `?${query}`}`)
    props.RootStore.getTeamMatches(id, query && `?${query}`)
  }, [range])

  return (
    <PageLayout>
      {loading.team !== false 
        ? <Loader /> 
        : <TeamPage 
            team={team}
            loading={loading.matches !== false}
            range={range}
            setRange={setRange}
          />
      }
    </PageLayout>
  )
}

export default inject('RootStore')(observer(Team))