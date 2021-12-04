import React from "react"
import {Row, Col} from "antd"
import PositivityImage from "./positivity2.png"
import TweetScorePositivity from "./tweetscore-sentiment.png"
import UserScorePositivity from "./userscore-sentiment.png"
import Table from "./table.png"

export const PositivityView = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <img src={PositivityImage} alt="potivity-graph"/>
        </Col>
        <Col span={8}>
          <img src={TweetScorePositivity} alt="potivity-graph"/>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <img src={UserScorePositivity} alt="potivity-graph"/>
        </Col>
        <Col span={8}>
          <img src={Table} alt="table-graph"/>
        </Col>
      </Row>
    </div>
  )
}