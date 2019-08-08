import axios from 'axios'

const api = axios.create({
    baseURL:"http://10.0.3.2:3001"//Genimotion
    // baseURL:"http://10.0.2.2:3001"//Android
})

export default api