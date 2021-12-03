import React from "react"
import { VisualizationProps } from "."
import {ScatterChart as RScatterPlot, XAxis, YAxis, ZAxis, Legend, Tooltip, Scatter, ResponsiveContainer} from "recharts"
import randomColor from "randomcolor"
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import "./ScatterChart.styles.css"

const colors = scaleOrdinal(schemeCategory10).range();


interface Entry {
  x: number,
  y: number,
  z: number,
  id: any
}

const groupByDimension = (data: any[], dimension: string) => {
  const groups = {}
  
  data.forEach((entry) => {
    const key = entry[dimension]
    if (!(key in groups)) {
      groups[key] = [] as Entry[]
    }
    const val: Entry = {
      y: entry.friends,
      x: entry.followers,
      z: entry.User_Score/1000,
      id: entry.id
    }
    groups[key].push(val)
  })

  return groups
}

const rangeFor = (data, key, scale=1) => {
  const values = data.map(entry => entry[key])
  const max = Math.max(...values)
  const min = Math.min(...values)
  console.log(min, max, values)
  return [min/scale, 3*max/scale]
}

const CustomToolTip = (event) => {
  let {active, payload} = event
  console.table(payload.map(p => p.payload))


  if (active) {
    payload = payload[0].payload 
    return (
      <div className="chart-tooltip">
        <div>
          <span>id: {payload.id}</span>
          <span>friends: {payload.y}</span>
          <span>followers: {payload.x}</span>
          <span>score: {payload.z}</span>
        </div>
      </div>
    )
  }

  return null
}

export const ScatterChart = (props: VisualizationProps) => {
  const groups = groupByDimension(props.data, props.dimension)
  const legend = Object.keys(groups).length > 10 ? null : <Legend/>
  return (
    <ResponsiveContainer width="80%" height="100%" minHeight={300}>

        <RScatterPlot>
          <XAxis dataKey="x" scale="linear" name="followers" type="number" domain={rangeFor(props.data, "followers", 1000)}/>
          <YAxis dataKey="y" scale="linear" name="friends" type="number" domain={rangeFor(props.data, "friends", 100)}/>
          <ZAxis dataKey="z" scale="linear" range={rangeFor(props.data, "User_Score", 1000)} name="score" type="number"/>
          <Tooltip />
          {legend}
          {Object.keys(groups).map((key, idx) => {
            const color = `${colors[idx % colors.length]}`
            console.log(color)
            return <Scatter name={key} data={groups[key]} fill={color} key={key} />
          })}
        </RScatterPlot>
    </ResponsiveContainer>
  )
}