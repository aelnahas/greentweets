import { useEffect, useState } from "react"
import {ResponsiveContainer, 
  Tooltip, 
  YAxis,
  XAxis, 
  BarChart as RBarChart,
  Bar,
  Legend} from "recharts"
import { BASE_URL } from "../../../utils/constants"


interface GraphsProps {
  keyword?: string
  groupBy: string
  metric: string
  color: string
}

interface ChartData {
  label: string,
  value: any
}

const convertData = (data, metric, groupBy): any[] => {
  console.log(data)
  if (groupBy.includes("-")) {
    const split = groupBy.split("-")
    groupBy = split[0]
  }
  let converted: any[] =  Object.keys(data).map((key) => ({[groupBy]: key, [metric]: data[key]}))
  if (metric === "user_score") {
    converted = converted.map(
      (entry) => ({ ...entry, [metric]: Math.log10(entry[metric]) }))
  }
  
  return converted
}

const getURL = (groupBy: string, metric: string, keyword?: string) => {
  let country=""
  if (groupBy.includes("-")) {
    const split = groupBy.split("-")
    country = split[1]
    groupBy = split[0]
  }
  let url:string = `${BASE_URL()}/queries/averages?key=${groupBy}&metric=${metric}&country=${country}`
  if (keyword) {
    url =  `${BASE_URL()}/queries/averaged-by-keywords?key=${groupBy}&metric=${metric}&keyword=${keyword}&country=${country}`
  }

  console.log(url)
  return url
}

export const GroupedByBarChart  = ({keyword, groupBy, metric, color}: GraphsProps) => {
  const [data, setData] = useState<ChartData[]>([])
  const url = getURL(groupBy, metric, keyword)
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(url)
      const respData = await resp.json()
      setData(convertData(respData, metric, groupBy))
    } 
    fetchData()
  }, [groupBy, metric, keyword, url])

  if (groupBy.includes("-")) {
    const split = groupBy.split("-")
    groupBy = split[0]
  }

  return (
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <RBarChart data={data}>
        <XAxis dataKey={groupBy} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={metric} barSize={100} fill={color}/>
      </RBarChart>
    </ResponsiveContainer>
  )
}