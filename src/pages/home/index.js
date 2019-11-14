import React from "react"
import { TabBar } from "antd-mobile"
import { Route } from "react-router-dom"
import Index from "../index"
import FindHouse from "../findhouse"
import News from "../news"
import My from "../my"

let nav = [
  { title: "首页", icon: "icon-ind", path: "/home" },
  { title: "找房", icon: "icon-findHouse", path: "/home/findhouse" },
  { title: "资讯", icon: "icon-infom", path: "/home/news" },
  { title: "我的", icon: "icon-my", path: "/home/my" }
]

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: this.props.location.pathname
    }
  }
 
  
  // 封装渲染导航
  renderTabItem(){
    return nav.map(item => {
      return (<TabBar.Item
        icon={<i className={'iconfont ' + item.icon}></i>}
        selectedIcon={<i className={'iconfont ' + item.icon}></i>}
        title={item.title}
        key={item.title}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path
          })

          this.props.history.push(item.path)
        }}
      ></TabBar.Item>)
    })
  }

  render() {
    return (
      <div className = 'home'>
        {/* 配置路由 */}
        <Route exact path="/home" component={Index}></Route>
        <Route exact path="/home/findhouse" component={FindHouse}></Route>
        <Route exact path="/home/news" component={News}></Route>
        <Route exact path="/home/my" component={My}></Route>
          {/* 导航 */}
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#21b97a"
            barTintColor="white"
          >
            {this.renderTabItem()}
            
          </TabBar>
        </div>
    )
  }


   // 数据更新时执行
   componentDidUpdate(prevProps,nextProps){
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
    
  }
}



export default Home
