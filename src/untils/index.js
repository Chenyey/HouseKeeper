import axios from "axios"
import { Promise } from "core-js"
// 封装获取地区方法
function getCurrentCity() {
  let cityName = JSON.parse(localStorage.getItem("localCity"))

  if (!cityName) {
    let myCity = new window.BMap.LocalCity()
    return new Promise(resolve => {
      myCity.get(async result => {
        //由于项目要求,拿到城市名称之后,要请求我们的服务器去获取城市信息
        let res = await axios.get(`${window.defaultUrl}/area/info`, {
          params: {
            name: result.name
          }
        })
        resolve(res.data.body)
        // 将获取到的信息存入到城市信息中
        localStorage.setItem("localCity",JSON.stringify(res.data.body))
      })
    })
  } else {
    return Promise.resolve(cityName)
  }
}
export { getCurrentCity }
