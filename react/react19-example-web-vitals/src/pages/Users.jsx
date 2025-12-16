
import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../api/fakeApi'

export default function Users(){
  const [users, setUsers] = useState(null)
  useEffect(() => {
    let mounted = true
    fetchUsers().then(data => {
      if(mounted) setUsers(data)
    })
    return () => mounted = false
  },[])
  if(!users) return <div className="card loading">Loading users (heavy, simulated delay)...</div>
  return (
    <div>
      <h2>Users</h2>
      <div className="grid">
        {users.slice(0,24).map(u => (
          <div className="card" key={u.id}>
            <h3>{u.name}</h3>
            <div className="small">{u.job}</div>
            <p className="small">{u.bio.slice(0,140)}...</p>
          </div>
        ))}
      </div>
      <p className="small">Showing first 24 users of {users.length}</p>
    </div>
  )
}
