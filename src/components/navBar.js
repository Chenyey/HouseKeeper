import React from "react"
import { NavBar } from "antd-mobile"
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types'

class NavTitle extends React.Component {
  render() {
    return (
      <NavBar
        mode="light"
        icon={<i className="iconfont icon-back"></i>}
        onLeftClick={() => this.props.history.go(-1)}
      >
        {this.props.children}
      </NavBar>
    )
  }
}
// 验证
NavTitle.propTypes = {
  children: PropTypes.string.isRequired
}

let WithNavTitle = withRouter(NavTitle)
export default WithNavTitle
