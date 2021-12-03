import React from "react"
import { BarChart, TreeMap, VisualizationProps, VisualizationTypes } from "./components"
import { ScatterChart } from "./components/ScatterChart"

enum Dimensions {
  LOCATION = "location",
  KEYWORDS = "keywords"
}

enum Metrics {
  FOLLOWERS,
  RETWEETS,
  FRIENDS,
  SCORE,
  LOCAL
}

const renderViz = (props: VisualizationProps) => {
  const {data, dimension, metric, vizType} = props
  if (props.vizType == VisualizationTypes.BARCHART) {
    return <BarChart data={data} dimension={dimension} metric={metric} vizType={vizType}/>
  }

  if (props.vizType == VisualizationTypes.TREEMAP) {
    return <TreeMap data={data} dimension={dimension} metric={metric} vizType={vizType}/>
  }

  if (props.vizType == VisualizationTypes.SCATTERCHART) {
    return <ScatterChart {...props}/>
  }

  return <div>Unknown selection</div>
}

export const Visualization = (props: VisualizationProps) => {
  return  renderViz(props)
}