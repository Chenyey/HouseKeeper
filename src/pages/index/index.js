import React from "react"
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile"
import axios from "axios"
import { getCurrentCity } from "../../untils"

// 导入导航图片
import nav1 from "../../assets/images/nav-1.png"
import nav2 from "../../assets/images/nav-2.png"
import nav3 from "../../assets/images/nav-3.png"
import nav4 from "../../assets/images/nav-4.png"

let navList = [
  { id: 1, title: "整租", icon: nav1, path: "/home/findhouse" },
  { id: 2, title: "合租", icon: nav2, path: "/home/findhouse" },
  { id: 3, title: "地图找房", icon: nav3, path: "/map" },
  { id: 4, title: "去出租", icon: nav4, path: "/rent/add" }
]

class Index extends React.Component {
  state = {
    swiper: [],
    imgHeight: 176,
    groups: [],
    news: [],
    cityName: "上海"
  }
  // 组件挂载时执行
  async componentDidMount() {
    this.getBanner() //调用获取banner方法
    this.getGroups() //获取小组数据
    this.getNews() //获取最新资讯数据
    // 获取地区数据
    let res = await getCurrentCity()
    this.setState({
      cityName: res.label
    })
  }
  // 封装获取banner方法
  async getBanner() {
    const data = await axios.get(`${window.defaultUrl}/home/swiper`)
    // console.log(data.data.body)
    this.setState({
      swiper: data.data.body
    })
  }

  // 获取租房小组数据
  async getGroups() {
    const res = await axios.get(`${window.defaultUrl}/home/groups`, {
      params: {
        area: "AREA|88cff55c-aaa4-e2e0"
      }
    })
    this.setState({
      groups: res.data.body
    })
  }

  // 获取最新资讯数据
  async getNews() {
    const res = await axios.get(`${window.defaultUrl}/home/news`, {
      params: {
        area: "AREA|88cff55c-aaa4-e2e0"
      }
    })
    // console.log(res);
    this.setState({
      news: res.data.body
    })
  }

  // 封装banner轮播
  renserSwiper() {
    return this.state.swiper.map(item => (
      <a
        key={item.id}
        style={{
          display: "inline-block",
          width: "100%",
          height: this.state.imgHeight
        }}
      >
        <img
          src={`${window.defaultUrl}${item.imgSrc}`}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event("resize"))
            this.setState({ imgHeight: "auto" })
          }}
        />
      </a>
    ))
  }

  // 封装快捷导航
  renderFastNav() {
    return (
      <Flex className="fast-nav">
        {navList.map(item => {
          return (
            <Flex.Item
              key={item.id}
              onClick={() => this.props.history.push(item.path)}
            >
              <img src={item.icon}></img>
              <h5>{item.title}</h5>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }
  // 渲染最新资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="banner">
          {this.state.swiper.length > 0 && (
            <Carousel autoplay={true} infinite>
              {this.renserSwiper()}
            </Carousel>
          )}
          {/* 搜索栏 */}
          <Flex className="header">
            <Flex.Item className="search">
              <div
                className="loaction"
                onClick={() => {
                  this.props.history.push("/citylist")
                }}
              >
                <span>{this.state.cityName}</span>
                <i className="iconfont icon-arrow"></i>
              </div>
              <div className="search-from">
                <i className="iconfont icon-seach"></i>
                <span>请输入小区或者地址</span>
              </div>
            </Flex.Item>
            <i
              className="iconfont icon-map"
              onClick={() => {
                this.props.history.push("/map")
              }}
            ></i>
          </Flex>
        </div>
        {/* 渲染导航 */}
        {this.renderFastNav()}
        {/* 租房小组 */}
        <div className="groups">
          <Flex className="groups-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* rendeItem 属性：用来 自定义 每一个单元格中的结构 */}
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            activeStyle
            hasLine={false}
            renderItem={item => (
              <Flex className="grid-item" justify="between">
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`${window.defaultUrl}${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}

export default Index
