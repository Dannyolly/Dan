import axios from 'axios'


const uri2 = `http://dandan.ihk.vipnps.vip/`

const base_url = uri2



/* 'http://localhost:8080' */
/* 'http://3kq8557234.zicp.vip' */
// axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function get(data) {
    return axios.get(base_url + data)
}

function post(url, data) {
    return axios.post(base_url + url, {...data })
}


export {
    get,
    post,
    axios,
    base_url
}