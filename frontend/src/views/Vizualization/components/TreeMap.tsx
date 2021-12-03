import React from "react"
import { VisualizationProps } from "./props"
import {Treemap, ResponsiveContainer} from "recharts"

export const TreeMap = (props: VisualizationProps) => {
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