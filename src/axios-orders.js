import axios from "axios"

const instance = axios.create({
    baseURL:"https://ishaq-burger-app.firebaseio.com/"
})

export default instance