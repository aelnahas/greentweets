import {AutoComplete} from "antd"

interface SearchProps {
  onSelectKey: any
  keywords: string[]
}

export const KeywordSearch = (props: SearchProps) => {
  const options = props.keywords.map((key) => ({
    value: key,
    label: key
  }))

  return (
    <AutoComplete
    style={{width: 300}}
    placeholder="search keyword"
    onSelect={props.onSelectKey}
    options={options}
    />
  )
}