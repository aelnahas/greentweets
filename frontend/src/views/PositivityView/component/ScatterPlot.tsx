import React from "react"
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter } from "recharts"

interface Props {
  data: any[],
  xDataKey: string,
  yDataKey: string,
  color: string,
  name: string
}

const ScatterPlot = ({data, xDataKey, yDataKey, color, name}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
    <ScatterChart data={data}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey={xDataKey} />
      <YAxis dataKey={yDataKey} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter name={name} data={data} fill={color} />
    </ScatterChart>
  </ResponsiveContainer>
  )
}