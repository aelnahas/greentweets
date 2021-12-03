import React from "react"
import { VisualizationProps } from "./props"
import {Treemap, ResponsiveContainer} from "recharts"

interface TreeDataChild {
  name: string,
  size: number
}

interface TreeData {
  name: string,
  children: TreeDataChild[]
}

const shapeData = (data, dimension, metric):TreeData[] => {
  return data.map((entry):TreeData => {
    return {
      name: entry[dimension],
      children: [
        {
          name: entry.id,
          size: entry[metric]
        }
      ]
    }
  })
}


export const TreeMap = (props: VisualizationProps) => {
  const data = shapeData(props.data, props.dimension, props.metric)
  return (
    <ResponsiveContainer width="80%" height="100%" minHeight={300}>
      <Treemap 
        data={props.data}
        dataKey={"size"}
        stroke="#fff"
        fill="#8884d8"
      />
    </ResponsiveContainer>
  )

}