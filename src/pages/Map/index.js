import React from "react"
import NavTitle from '../../components/navBar'

class Map extends React.Component {
  componentDidMount() {
    let BMap = window.BMap
    let map = new BMap.Map("container") // 创建地图实例
    let point = new BMap.Point(121.618150094325, 31.040657606659842) // 创建点坐标
    map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
  }
  render() {
    return (
      <div className="map">
        <NavTitle>地图找房</NavTitle>
        <div id="container"></div>
      </div>
    )
  }
}

export default Map
