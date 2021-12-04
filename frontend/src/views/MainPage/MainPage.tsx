import React, { useState } from "react"
import "./styles.css"
import {Layout, Menu} from "antd"
import { PositivityView } from "../PositivityView/PosivityView"
import { InfluenceView } from "../InfluenceView/InfluenceView"

const {Header, Content} = Layout

const renderSelection = (selection) => {
  console.log(selection)
  if (selection === "positivity") {
    return <PositivityView/>
  } else {
    return <InfluenceView/>
  }
}

export const MainPage = () => {
  const [selected, setSelected] = useState("positivity")

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["positivity"]}  onClick={({key}) => setSelected(key)}>
          <Menu.Item key="positivity">Positivity</Menu.Item>
          <Menu.Item key="influence">Influence</Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        {renderSelection(selected)}
      </Content>
    </Layout>
  )
}

// export const MainPage = () => {
//   return (
//     <Layout>
//       <Header>

//       </Header>
//       <Content>

//       </Content>
//     </Layout>
//   )
// }

// export const MainPage = () => {
//   const [data, setData] = React.useState([])
//   const [dimension, setDimension] = React.useState<any>("key_word")
//   const [metric, setMetric] = React.useState("followers")
//   const [vizType, setVizType] = React.useState(VisualizationTypes.BARCHART)
//   const [filteredData, setFilteredData] = React.useState([])

//   React.useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`${BASE_URL()}/queries/raw`);

//       if (response.ok) {
//         const table = await response.json()
//         setData(table)
//       }
//     }

//     fetchData()
//   }, [])

//   const onSelectDimension = (value) => {
//     setDimension(value)
//   }

//   const onSelectMetric = (value) => {
//     setMetric(value)
//   }

//   const handleFilterChange = (event) => {
//     const term = event.target.value
//     setFilteredData(filterData(data, term))
//   }



  // return (
  //   <div className="container">
  //     <header className="header">
  //       <nav className="navbar">
  //         <Select
  //           showSearch
  //           placeholder="select metric"
  //           onSelect={onSelectMetric}
  //         >
  //           <Option value="followers">Followers</Option>
  //           <Option value="retweets">Retweets</Option>
  //           <Option value="friends">Friends</Option>
  //           <Option value="user_score">User Score</Option>
  //           <Option value="tweet_score">Tweet Score</Option>
  //           <Option value="likes">Likes</Option>
  //         </Select>

  //         <Select
  //           showSearch
  //           placeholder="select dimension"
  //           onSelect={onSelectDimension}
  //         >
  //           <Option value="location">Location</Option>
  //           <Option value="keyword">Keyword</Option>
  //           <Option value="city">city</Option>
  //           <Option value="region">region</Option>
  //           <Option value="country">Country</Option>
  //         </Select>

  //         <Select
  //           showSearch
  //           placeholder="select viz"
  //           onSelect={(value: any) => { setVizType(value)}}
  //         >
  //           <Option value="treemap">Treemap</Option>
  //           <Option value="geomap">Geo map</Option>
  //           <Option value={VisualizationTypes.BARCHART}>BartChart</Option>
  //           <Option value={VisualizationTypes.SCATTERCHART}>ScatterChart</Option>
  //         </Select>

  //         <Search
  //           onChange={handleFilterChange}
  //         />
  //       </nav>
  //     </header>
  //     <PositivityView/>
  //     {/* <div className="item">
  //       <Visualization data={filteredData} metric={metric} dimension={dimension} vizType={vizType}/>
  //     </div>
  //     <div className="item container__table">
  //       <Table data={filteredData}/>
  //     </div> */}
  //   </div>
  // )
// }