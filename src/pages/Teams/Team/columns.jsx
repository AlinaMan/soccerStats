import React from 'react'

const Name = row => {
  const { name, area } = row.competition

  return (
    <div className="cell-name">
      <img src={area.ensignUrl} alt={area.name} />
      <span>{name}</span>
    </div>
  )
}

const Score = row => {
  const { homeTeam, awayTeam } = row.score.fullTime

  return homeTeam !== null && awayTeam !== null
    ? homeTeam + ' : ' + awayTeam
    : ''
}

const Referees = row => (
  <>
    {row.referees.map(referee => <p key={referee.id} style={{ fontSize: '12px' }}>{referee.name}</p>)}
  </>
)

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const getDate = row => new Date(row.utcDate).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })

export default {
  squad: [
    { label: 'Name', field: 'name' },
    { label: 'Position', field: 'position' },
    { label: 'Role', field: row => capitalize(row.role) },
    { label: 'Date of Birth', field: row => new Date(row.dateOfBirth).toDateString() },
    { label: 'Country of Birth', field: 'countryOfBirth' },
    { label: 'Nationality', field: 'nationality' },
  ],

  matches: [
    { label: 'Match day', field: 'matchday' },
    { label: 'Match date', field: getDate },
    { label: 'Teams', field: row => row.homeTeam.name + '  —  ' + row.awayTeam.name },
    { label: 'Score', field: Score },
    { label: 'Status', field: row => capitalize(row.status) },
    { label: 'League', field: Name },
    { label: 'Referees', field: Referees },
  ]
}