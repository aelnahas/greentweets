import * as React from "react"
import { Input, Select} from "antd"
import "./styles.css"
import {Table} from "../Table"
import { BASE_URL } from "../../utils/constants"
import { Visualization } from "../Vizualization/Vizualization"
import { VisualizationTypes } from "../Vizualization"
import { commandRegistryModule } from "@antv/xflow-core"

const {Option} = Select
const {Search} = Input

const filterData = (data, term) => {
  if (!term) {
    return data
  }
  return data.filter((entry) => {
    return (entry.key_word.includes(term)) || (entry.tweets.includes(term))
  })
}

export const MainPage = () => {
  const [data, setData] = React.useState([])
  const [dimension, setDimension] = React.useState<any>("key_word")
  const [metric, setMetric] = React.useState("followers")
  const [vizType, setVizType] = React.useState(VisualizationTypes.BARCHART)
  const [keywords, setKeywords] = React.useState([])
  const [filter, setFilter] = React.useState([])
  const [filteredData, setFilteredData] = React.useState([])

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

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL()}/queries/keywords`);

      if (response.ok) {
        setKeywords(await response.json())
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

  const handleFilterChange = (event) => {
    const term = event.target.value
    setFilter(term)
    setFilteredData(filterData(data, term))
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

          <Search
            onChange={handleFilterChange}
          />
        </nav>
      </header>
      <div className="item">
        <Visualization data={filteredData} metric={metric} dimension={dimension} vizType={vizType}/>
      </div>
      <div className="item container__table">
        <Table data={filteredData}/>
      </div>
    </div>
  )
}