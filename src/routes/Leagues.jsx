import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import PageLayout from '../layouts/page'
import LeagueList from '../pages/Leagues'

const Leagues = props => {
  const { leagues, loading } = props.RootStore
  const search = new URLSearchParams(props.location.search).get('search')
  const year = new URLSearchParams(props.location.search).get('year')

  useEffect(() => {
    !leagues.length && props.RootStore.getLeagues()
  }, []);

  return (
    <PageLayout>
      <LeagueList 
        loading={loading.leagues !== false}
        leagues={leagues}
        search={search}
        year={year}
      />
    </PageLayout>
  )
};

export default inject('RootStore')(observer(Leagues))