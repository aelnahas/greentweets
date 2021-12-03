import * as React from "react"
import {Table as AntDTable} from "antd"
import { BASE_URL } from "../../utils/constants"

const COLUMNS = [
  {
    title: "id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "tweets",
    dataIndex: "tweets",
    key: "tweets"
  },
  {
    title: "likes",
    dataIndex: "likes",
    key: "likes"
  },
  {
    title: "retweets",
    dataIndex: "retweets",
    key: "retweets"
  },
  {
    title: "time",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "followers",
    dataIndex: "followers",
    key: "followers"
  },
  {
    title: "friends",
    dataIndex: "friends",
    key: "friends"
  },
  {
    title: "score",
    dataIndex: "User_Score",
    key: "score"
  },
  {
    title: "location",
    dataIndex: "location",
    key: "location"
  },  
  {
    title: "keywords",
    dataIndex: "key_word",
    key: "key_word"
  },
  {
    title: "In Lake Ontario ?",
    dataIndex:"inclakeontario",
    key: "inclakeontario"
  }
]

const transformTable = (table: any) => {
  console.log(table)
  return table
}

export const Table = () => {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL()}/queries/raw`);

      if (response.ok) {
        const table = await response.json()
        setData(transformTable(table))
      }
    }

    fetchData()
  }, [])


  return (
      <AntDTable columns={COLUMNS} dataSource={data}/>
    )
}