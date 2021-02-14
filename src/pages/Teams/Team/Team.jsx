import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Table from '../../../components/Table/Table'
import columns from './columns'
import '../../style.scss'

const Team = ({ team, loading, range, setRange }) => {
  const [show, setShow] = useState(false)
  const { data, matches } = team

  return (
    <>
      <div className="bread-crumps">
        <Link to='/teams'>
          <span className="back">&#8617;</span>
        </Link>
      </div>

      <div className="team">
        <div className="team-title">
          <h1>{data.name}</h1>
          <img src={data.crestUrl} alt="" />
        </div>

        <div className="team-info">
          <h3>Additional information:</h3>
          <div className="team-info__wrapper">
            <Info label="Founded" info={data.founded} />
            <Info label="Address" info={data.address} />
            <Info label="Country" info={data.area.name} />
            <Info label="Club colors" info={data.clubColors} />
            <Info label="Email" email={data.email} />
            <Info label="Phone number" phone={data.phone} />
            <Info label="Venue" info={data.venue} />
            <Info label="Website" link={data.website} />
            <Info label="Short name" info={data.shortName} />
          </div>
        </div>

        <ul className="team-info">
          <h4>Active competitions:</h4>
          {data.activeCompetitions.map(c => <li key={c.id}>{c.name} — {c.area.name}</li>)}
        </ul>

        <div className="show-link" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'} squad list
        </div>

        {show && (
          <div className="team-info">
            <h4>Squad:</h4>
            <Table
              data={data.squad}
              columns={columns.squad}
            />
          </div>
        )}

        <div className="team-info">
          <div className="datepicker-wrapper">
            <h4>Matches:</h4>
            <DateRangePicker
              maxDate={new Date()}
              format="dd/MM/yyyy"
              value={range}
              onChange={setRange}
            />
          </div>

          <Table
            data={matches}
            loading={loading}
            columns={columns.matches}
          />
        </div>
      </div>
    </>
  )
}

const Info = ({ label, info, link, email, phone }) => {
  if (!info && !link && !email && !phone) return null

  return (
    <div className="info">
      <h5>{label}:</h5>
      {info && <p>{info}</p>}
      {link && <a href={link} target="_blank">{link}</a>}
      {email && <a href={'mailto:' + email}>{email}</a>}
      {phone && <a href={'tel:' + phone}>{phone}</a>}
    </div>
  )
}

export default observer(Team)