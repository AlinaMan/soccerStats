import React from 'react'
import { inject, observer } from 'mobx-react'
import danger from '../../assets/img/danger.svg'
import './Notification.scss'

const Notifications = props => {
  const { notifications } = props.RootStore;

  return (
    <div className="notifications">
      {notifications.map(n => (
        <div key={n.id} className="notification danger">
          <img src={danger} className="icon" />

          <div className="info">
            {n.text && <h4 className="title">{n.text}</h4>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default inject('RootStore')(observer(Notifications))
