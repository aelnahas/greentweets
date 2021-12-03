import * as React from "react"
import {Layout, Menu} from "antd"
import "./styles.css"
import {Table} from "../Table"

const {Header, Content, Sider} = Layout

enum Selection {
  INFLUENCERS = "influencers",
  DONATIONS = "donations",
  IMPRESSIONS = "impressions",
  TABLE = "table"
}

const RenderViz = (key: string) => {
  switch(key) {
    case Selection.INFLUENCERS:
      return <div>influencers viz</div>
    case Selection.DONATIONS:
      return <div>donations viz</div>
    case Selection.IMPRESSIONS:
      return <div>impressions viz</div>
    default:
      return <Table/>
  }
}

export const MainPage = () => {
  const [collapsed, setCollapsed] = React.useState<boolean|undefined>(false);
  const [selection, setSelection] = React.useState<string>(Selection.INFLUENCERS)
  const onCollapse = (status: boolean) => {setCollapsed(status)}

  return (
    <Layout className="layout">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu defaultSelectedKeys={[Selection.INFLUENCERS]} 
          mode="inline"
          theme="dark"
          onSelect= {({key}) => setSelection(key)}
          >
          <Menu.Item key={Selection.INFLUENCERS}>Influencers</Menu.Item>
          <Menu.Item key={Selection.DONATIONS}>Donations</Menu.Item>
          <Menu.Item key={Selection.IMPRESSIONS}>Impressions</Menu.Item>
          <Menu.Item key={Selection.TABLE}>Table</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content className="site-layout-background content">
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {RenderViz(selection)}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}