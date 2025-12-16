
import React, { useMemo } from 'react'
import { PRODUCTS } from '../data/products'
import { USERS } from '../data/users'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Legend, Bar } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6B8A']

export default function Reports(){
  // Products per category (pie)
  const productsByCategory = useMemo(() => {
    const map = {}
    for(const p of PRODUCTS){
      map[p.category] = (map[p.category] || 0) + 1
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  },[])

  // Users per job (bar)
  const usersByJob = useMemo(() => {
    const map = {}
    for(const u of USERS){
      map[u.job] = (map[u.job] || 0) + 1
    }
    return Object.entries(map).map(([job, count]) => ({ job, count }))
  },[])

  return (
    <div>
      <h2>Reports</h2>
      <div className="grid">
        <div className="card" style={{height:350}}>
          <h3>Products per Category</h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={productsByCategory} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} label>
                {productsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{height:350}}>
          <h3>Users per Job</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={usersByJob}>
              <XAxis dataKey="job" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Users">
                {usersByJob.map((entry, index) => (
                  <Cell key={`c-${index}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
