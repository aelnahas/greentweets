import React, { useEffect, useState } from "react"
import { Select,Row, Col, Divider} from "antd"
import { BASE_URL } from "../../utils/constants"
import {Table} from "../../components/Table"
import { GroupedByBarChart } from "./components/Graphs"
import { KeywordSearch} from "./components/KeywordSearch"
import {UserScoreRanking} from "./components/UserScoreRanking"

const {Option} = Select

const renderBarCharts = (groupBy, keyword) => {
  return (
    <Row gutter={20}>
    <Col span={24}>
      <GroupedByBarChart groupBy={groupBy} metric="user_score" color="#9C27B0" keyword={keyword} />
    </Col>
    <Col span={12}>
      <GroupedByBarChart groupBy={groupBy} metric="tweet_score" color="#C0392B" keyword={keyword}/>
    </Col>
    <Col span={12}>
      <GroupedByBarChart groupBy={groupBy} metric="tweet_effectiveness" color="#3498DB" keyword={keyword}/>
    </Col>
  </Row>
  )
}

const renderRanking = () => {
  return <UserScoreRanking/>
}


export const InfluenceView = () => {
  const [data, setData] = useState([])
  const [groupBy, setGroupBy] = useState('city')
  const [viz, setViz] = useState('barchart')
  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`${BASE_URL()}/queries/raw`)
      if (resp.ok) {
        setData(await resp.json())
      } else {
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`${BASE_URL()}/queries/keywords`)
      if (resp.ok) {
        setKeywords(await resp.json())
      } else {
      }
    }
    fetchData()
  }, [])

  let renderedViz = <div/>
  if (viz === "barchart") {
    renderedViz = renderBarCharts(groupBy, keyword)
  } else if (viz === "ranking") {
    renderedViz = renderRanking()
  }

  const onSearchKey = (value) => {
    console.log(value)
    setKeyword(value)
  }

  return (
    <div>
      <div className="controls">
        <Select 
          showSearch 
          placeholder="aggregate by"
          onSelect={(value) => setGroupBy(`${value}`)}
          defaultValue={"country"}
          >
          <Option value="city">City</Option>
          <Option value="country">Country</Option>
          <Option value="region-Canada">Region-Canada</Option>
          <Option value="region-United States">Region-US</Option>
          <Option value="region">All Regions</Option>
        </Select>
        <Select
          showSearch
          placeholder="select visualization"
          onSelect={(value) => setViz(`${value}`)}
          defaultValue={"barchart"}
        >
          {/* <Option value="map">Geo Map</Option>
          <Option value="ranking">Ranking</Option> */}
          <Option value="barchart">BarChart</Option>
        </Select>

        <KeywordSearch onSelectKey={onSearchKey} keywords={keywords}/>
      </div>
      <Divider/>
        {renderedViz}

      <Divider/>
      <Table data={data} />
    </div>
  )
}