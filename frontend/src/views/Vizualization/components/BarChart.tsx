import React from "react"
import { VisualizationProps } from "./props"
import {Bar, BarChart as RBarChart, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip} from "recharts"
import {randomColor} from "randomcolor"


const groupData = (data: any[], groupKey: string, metrics: string[]) => {
  const groups = {}

  data.filter(entry => entry[groupKey]).forEach((entry) => {
    const key = entry[groupKey]
    if(!(key in groups)) {
      const obj = {}
      obj[groupKey] = key
      metrics.forEach((metric) => {
        obj[metric] = 0
      })
      groups[key] = obj
    }

    metrics.forEach((metric) => {
      groups[key][metric] += entry[metric]
    })
  })

  return Object.values(groups)
}

export const BarChart = (props: VisualizationProps) => {
  const groupedData = groupData(props.data, props.dimension, [props.metric])
  console.table(groupedData)


  return (
    <ResponsiveContainer width="80%" height="100%" minHeight={300}>
      <RBarChart data={groupedData}>
        <XAxis dataKey={props.dimension}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={props.metric} barSize={30} fill={randomColor()}/>
      </RBarChart>
    </ResponsiveContainer>
  )

}