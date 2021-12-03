import { Input } from "antd"
import React, { useState } from "react"

const {Search} = Input

export const SearchBar = (props: any) => {
  const {onSearch} = props

  return (
    <Search placeholder="input search text" 
    allowClear={true} onSearch={onSearch} style={{ width: 200 }} />
  )
}