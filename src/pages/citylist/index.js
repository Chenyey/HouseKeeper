import React from "react"
import NavTitle from '../../components/navBar'
import { Toast } from 'antd-mobile'

import axios from "axios"
// 封装的获取默认地址组件
import { getCurrentCity } from "../../untils"
// 区域加载插件
import { List } from "react-virtualized"
// 自动生成高度组件
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer"

import "react-virtualized/styles.css"

const TITLE_HEIGHT = 45
const CITY_TITLE = 36
const CITY_NAME = 50
const ACTIVE_CITY = ['北京', '上海', '深圳', '广州']

// 房源列表文字处理
function FormatList(text){
  console.log(text);
  switch (text){
    case 'current' :
      return '当前城市'
    case 'hot':
      return '热门城市'
    
      default:
        return text
  }
}
// 房源序列文字处理                                                 序列文字处理
function FormatNav(text){
  switch (text){
    case 'current' :
      return '#'
    case 'hot':
      return '热'
    
      default:
        return text.toUpperCase()
  }
}

class CityList extends React.Component {
  state = {
    cityList: {},
    firstArr: [],
    current: 0
  }
  // 创建ref实例
  listRef = React.createRef()
  async componentDidMount() {
    let res = await axios.get(`${window.defaultUrl}/area/city`, {
      params: {
        level: 1
      }
    })
    let { citySort, cityObj } = this.makeCity(res.data.body)
    // 将热门城市数据添加到数组中
    // -- 获取热门城市数据
    let hotRes = await axios.get(`${window.defaultUrl}/area/hot`)
    // -- 将热门城市数据添加到城市数组中F
    cityObj.hot = hotRes.data.body

    // 在索引中添加一项
    citySort.unshift("hot")
    // 获取当前城市
    let currentCity = await getCurrentCity()
    cityObj.current = [currentCity]
    // 修改索引
    citySort.unshift("current")
    // 将数据赋值给state
    this.setState({
      cityList: cityObj,
      firstArr: citySort
    })
  }
  // 封装处理城市格式方法
  makeCity(cityList) {
    let cityObj = {} //存放城市的空数组

    cityList.forEach(item => {
      let first = item.short.slice(0, 1)
      if (cityObj[first]) {
        cityObj[first].push(item)
      } else {
        cityObj[first] = [item]
      }
    })
    // 创建一个序号数组
    let citySort = Object.keys(cityObj).sort()

    return { citySort, cityObj }
  }
  // 渲染行
  rowRenderer = ({ key, index, style }) => {
    const { firstArr, cityList } = this.state
    const currnt = firstArr[index]
    let list = cityList[currnt]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{FormatList(firstArr[index])}</div>
        {/* 渲染列表 */}
        {list.map(item => {
          return (
            <div className="name" key={item.value} onClick={()=>this.changeCity(item)}>
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }
  // 行高
  rowHeight = ({ index }) => {
    const { firstArr, cityList } = this.state
    const currntList = cityList[firstArr[index]]
    return CITY_TITLE + CITY_NAME * currntList.length
  }
  // 滚动事件
  RowsRendered = ({ startIndex, stopIndex }) => {
    if (startIndex !== this.state.current) {
      this.setState({
        current: startIndex
      })
    }
  }
  // 切换城市
  changeCity = (city) =>{
    let index = ACTIVE_CITY.findIndex(item=> item === city.label)
    // 如果>=0证明有数据
    if(index >=0){
      localStorage.setItem('localCity',JSON.stringify(city))
      this.props.history.go(-1)
    }else{
      Toast.info('当前城市没有房源', 2)
    }
  }
  render() {
    const { firstArr, cityList } = this.state
    return (
      <div className="city-list">
        <NavTitle>城市列表</NavTitle>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={this.listRef}
              scrollToAlignment="start"
              width={width}
              height={height - TITLE_HEIGHT}
              rowCount={firstArr.length}
              rowHeight={this.rowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.RowsRendered}
            />
          )}
        </AutoSizer>
        {/* // 右侧城市列表数据： */}
        <ul className="city-index">
          {this.state.firstArr.map((item, index) => {
            return (
              <li
                className="city-index-item"
                key={item}
                onClick={() => {
                  this.listRef.current.scrollToRow(index)
                  this.setState({
                    current: index
                  })
                }}
              >
                {/* 高亮类名： index-active */}
                <span
                  className={index === this.state.current ? "index-active" : ""}
                >
                  {FormatNav(item)}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CityList
