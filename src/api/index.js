import axios from 'axios'
import * as url from './urlConfig'
import { character } from '@/components/config/Character'
// axios.defaults.withCredentials = true

// 对后台进行请求
export const back = {
  // 1.1 session信息查询（获取session数据或者新建session）
  sessionInfoCtr (param) {
    return axios({
      url: `${url.backbasurl}/sessions?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  // 1.2 目前可支持数据库类型获取
  dataBaseTypeQue (param) {
    return axios({
      url: `${url.backbasurl}/databases/types?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  // 1.3 新建数据库连接
  dataBaseAdd (param) {
    return axios({
      url: `${url.backbasurl}/databases?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'name': param.name,
        'host': param.ip,
        'port': param.port,
        'username': param.username,
        'password': param.password,
        'databaseType': param.dbType
      },
      withCredentials: true
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  // 1.4 数据表查询
  dataBaseFormQue (param) {
    return axios({
      url: `${url.backbasurl}/databases/${param.schema}/tables?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  // 1.5 生成代码
  codeProduce (param) {
    return axios({
      url: `${url.backbasurl}/charging/wx/user/charger/history?page=${param.page}&size=${param.size}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  // 1.6 文件查看
  codeFileQue (param) {
    return axios({
      url: `${url.backbasurl}/charging/wx/user/charger/history?page=${param.page}&size=${param.size}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
