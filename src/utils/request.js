import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import {store} from '@/store'
import { getToken } from '@/utils/auth'
// import { refreshToken } from '@/utils/token'
import cookie from '@/utils/cookie'
import i18n from '@/lang'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api base_url
  timeout: 30000 // request timeout
})

// service.defaults.headers.common = {
//   'Accept': 'application/json, */*'
// }
// const allowMethods = ['get', 'post', 'put', 'delete']
// allowMethods.forEach(method => {
//   service.defaults.headers[method] = {
//     'Content-Type': 'application/json'
//   }
// })

// request interceptor
service.interceptors.request.use(
  config => {
    if (cookie.getCookie('Admin-Token')) {
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['user_id'] = cookie.getCookie('userId')
    }

    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (cookie.getCookie('Admin-Token')) {
      const expires_at = cookie.getCookie('expires-at')
      const now = new Date().getTime()
      const remindTime = (expires_at - now) / (1000 * 60)
      if (remindTime < 5) {
        // refreshToken()
      }
      // refreshToken()
    }
    return response
  },
  error => {
    console.log('error response', error.response)
    if (error.response && error.response.status === 401) {
      var errorMessage = '로그인 세션이 만료되었습니다. 로그아웃 처리 됩니다.'
      if (error.response.data.error) {
        if (error.response.data.error === 'invalid_token') {
          errorMessage = '로그인 토큰이 유효하지 않습니다. 다른 기기에서 로그인 했을 수 있습니다.'
        }
      }
      MessageBox(errorMessage, '토큰이 유효하지 않습니다.', {
        confirmButtonText: i18n.t('common.message.YES'),
        type: 'info'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }).catch(() => {
      })
    } else {
      if (error.response.status === 404 && error.response.data.message === '사용자 정보가 없습니다.') {
        MessageBox('사용자 인증 토큰이 만료되었습니다. 다시 로그인 해주세요.', '로그인 토큰 만료', {
          confirmButtonText: i18n.t('common.message.YES'),
          type: 'warning'
        }).then(() => {
        }).catch(() => {
        }).finally(() => {
          store.dispatch('LogOut').then(() => {
            location.reload()
          })
        })
      } else {
        console.log('server error code : ', error.response.data.errorCode)
        const message = error.response.data.errorCode && i18n.te('serverError.' + error.response.data.errorCode)
          ? i18n.t('serverError.' + error.response.data.errorCode)
          : error.response.data.message

        Message({
          message: 'error : ' + message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service
