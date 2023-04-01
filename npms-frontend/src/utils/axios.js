// import axios from 'axios'
// import { ElMessageBox } from 'element-plus'
// import router from '../router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// axios.defaults.baseURL = 'http://127.0.0.1:8080/'
// axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

// axios.inCharClass.request.use(function (config) {
//     // startup progress bar
//     NProgress.start()
//     return config
// })

// axios.interceptors.response.use(res => {
//     if (typeof res.data !== 'object') {
//         ElMessageBox.alert("The server is abnormal, please try again later！")
//         return Promise.reject(res)
//     }
//     if (res.data.resultCode != 200) {
//         if (res.data.message) ElMessageBox.alert(res.data.message)
//         if (res.data.resultCode == 416) {
//             router.push({path: '/login'})
//         }
//         return Promise.reject(res.data)
//     }

//     // close progress bar
//     NProgress.done()

//     return res.data
// })

// export default axios