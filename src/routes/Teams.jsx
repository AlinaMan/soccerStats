import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import PageLayout from '../layouts/page'
import TeamList from '../pages/Teams/Teams'

const Teams = props => {
  const { teams, loading } = props.RootStore
  const search = new URLSearchParams(props.location.search).get('search')
  const year = new URLSearchParams(props.location.search).get('year')

  useEffect(() => {
    !teams.length && props.RootStore.getTeams()
  }, []);

  return (
    <PageLayout>
      <TeamList 
        loading={loading.teams !== false}
        teams={teams}
        search={search}
        year={year}
      />
    </PageLayout>
  )
};

export default inject('RootStore')(observer(Teams))