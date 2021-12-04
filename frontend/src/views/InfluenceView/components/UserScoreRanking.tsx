import React, { useState, useEffect } from "react"
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Legend, Tooltip } from "recharts"
import { BASE_URL } from "../../../utils/constants"

const transform = (data) => {
  return data.map((entry, idx) => ({
    [idx]: idx,
    user_score: Math.log10(entry.user_score),
    ...entry
  })).reverse()
}

export const UserScoreRanking = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`${BASE_URL()}/queries/sorted-scores`)
      if (resp.ok) {
        setData(transform(await resp.json()))
      }
    }
    fetchData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
    <BarChart data={data} layout="vertical">
      <XAxis type="number" />
      <YAxis type="category" dataKey="user_score"/>
      <Tooltip />
      <Legend />
      {data.map((entry, idx) => {
        <Bar dataKey={`${idx}`} barSize={100} fill="#212672"/>
      })}
    </BarChart>
  </ResponsiveContainer>
)
}