import axios from "axios";
// 请求验证码
export function getCode(){
    return axios.get(`/api/admin/validate/code/get`)
}
