import * as React from "react"
import {Table as AntDTable} from "antd"
import { SortOrder } from "antd/lib/table/interface"

const COLUMNS = [
  {
    title: "user_score",
    dataIndex: "user_score",
    key: "score",
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a, b) => a.user_score - b.user_score,
  },
  {
    title: "tweet score",
    dataIndex: "tweet_score",
    key: "tweet_score",
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a, b) => a.tweet_score - b.tweet_score,
  },
  {
    title: "tweet effectiveness",
    dataIndex: "tweet_effectiveness",
    key: "tweet_effectiveness",
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a, b) => a.tweet_effectiveness - b.tweet_effectiveness,
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
    title: "city",
    dataIndex: "city",
    key: "city"
  },
  {
    title: "region",
    dataIndex: "region",
    key: "region"
  },
  {
    title: "country",
    dataIndex: "country",
    key: "country"
  },
  {
    title: "keywords",
    dataIndex: "keyword",
    key: "keyword"
  },
  {
    title: "subjectivity",
    dataIndex: "subjectivity",
    key: "subjectivity"
  },
  {
    title: "sentiment",
    dataIndex: "sentiment",
    key: "sentiment"
  },
  {
    title: "donation",
    dataIndex: "donation",
    key: "donation"
  }
]

interface TableProps {
  data: any[]
}

export const Table = (props: TableProps) => {
  return <AntDTable columns={COLUMNS} dataSource={props.data}/>
}