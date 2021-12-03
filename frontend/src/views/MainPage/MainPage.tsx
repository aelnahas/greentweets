import * as React from "react"
import {Layout, Select} from "antd"
import "./styles.css"
import {Table} from "../Table"
import { BASE_URL } from "../../utils/constants"
import { Visualization } from "../Vizualization/Vizualization"
import { VisualizationTypes } from "../Vizualization"

const {Header, Content} = Layout
const {Option} = Select

const groupData = (data: any[], groupKey: string, metrics: string[]) => {
  const groups = {}

  data.forEach((entry) => {
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

  return Object.values(groups) as  any[]
}

export const MainPage = () => {
  const [data, setData] = React.useState([])
  const [dimension, setDimension] = React.useState<any>("key_word")
  const [metric, setMetric] = React.useState("followers")
  const [vizType, setVizType] = React.useState(VisualizationTypes.BARCHART)

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL()}/queries/raw`);

      if (response.ok) {
        const table = await response.json()
        setData(table)
      }
    }

    fetchData()
  }, [])

  const onSelectDimension = (value) => {
    setDimension(value)
  }

  const onSelectMetric = (value) => {
    setMetric(value)
  }

  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <Select
            showSearch
            placeholder="select metric"
            onSelect={onSelectMetric}
          >
            <Option value="followers">Followers</Option>
            <Option value="retweets">Retweets</Option>
            <Option value="friends">Friends</Option>
            <Option value="User_Score">Score</Option>
            <Option value="likes">Likes</Option>
          </Select>

          <Select
            showSearch
            placeholder="select dimension"
            onSelect={onSelectDimension}
          >
            <Option value="location">Location</Option>
            <Option value="key_word">Keyword</Option>
          </Select>

          <Select
            showSearch
            placeholder="select viz"
            onSelect={(value: any) => { setVizType(value)}}
          >
            <Option value="treemap">Treemap</Option>
            <Option value="geomap">Geo map</Option>
            <Option value={VisualizationTypes.BARCHART}>BartChart</Option>
            <Option value={VisualizationTypes.SCATTERCHART}>ScatterChart</Option>
          </Select>
        </nav>
      </header>
      <div className="item">
        <Visualization data={data} metric={metric} dimension={dimension} vizType={vizType}/>
      </div>
      <div className="item container__table">
        <Table data={data}/>
      </div>
    </div>
  )
}