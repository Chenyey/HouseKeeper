import React from "react"
import { BrowserRouter as Router, Route ,Redirect} from "react-router-dom"
import Home from './pages/home'
import CityList from './pages/citylist'
import Map from './pages/Map'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/fonts/iconfont.css'
import {defaultUrl} from './Url' //导入默认url配置文件

window.defaultUrl = defaultUrl

class App extends React.Component {
  render() {
    return <Router>
        <Route path='/' exact render = {()=><Redirect to='/home'></Redirect>}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/citylist' component={CityList}></Route>
        <Route path='/map' component={Map}></Route>
      
    </Router>
  }
}

export default App
