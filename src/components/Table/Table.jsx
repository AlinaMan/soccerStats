import React from 'react'
import _ from 'lodash'
import Loader from '../Loader/Loader'
import './Table.scss'

const Table = ({ columns, data, loading, onRowClick }) => (
  <table className="tmplt-table">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.label}>{col.label}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {loading ? (
        <tr>
          <td colSpan={columns.length}>
            <Loader />
          </td>
        </tr>
      ) : data.length ? (
        data.map((d, id) => (
          <tr key={id} style={{ cursor: 'pointer' }} onClick={() => onRowClick && onRowClick(d)}>
            {columns.map((col, idx) => (
              <td key={id + '_' + idx}>
                {typeof col.field === 'string' ? _.get(d, col.field) : col.field(d)}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length}>No data</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default Table