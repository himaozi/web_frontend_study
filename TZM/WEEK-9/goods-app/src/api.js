import axios from "axios";
// 请求验证码
export function getCode(){
    return axios.get(`/api/admin/validate/code/get`)
}

// 登录页面
export function userLogin(user){
    return axios.post(`/api/admin/login`,user)
}


// cookie按名称读取值的函数
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}


// axios设置请求拦截器，设置请求头
axios.interceptors.request.use(
    config => {
        let Authorization = getCookie('token')
       
        if (Authorization) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['Authori-zation'] = `${Authorization}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });



// 分页获取商品信息接口
export function getProduct(product){
        // const product={cateId:'', keywords:'',limit:10,page:1,type:1}
    return axios.get(`/api/admin/store/product/list`,{ params: product })
}


// 获取表头商品数量
export function getType(){
    return axios.get(`/api/admin/store/product/tabs/headers`)
}

// 上架
export function isShow(id){
    return axios.get(`/api/admin/store/product/putOnShell/${id}`)
}

// 下架
export function unShow(id){
    return axios.get(`/api/admin/store/product/offShell/${id}`)
}

// 放入回收站
export function recycle(id){
    return axios.get(`/api/admin/store/product/delete/${id}`)
}

// 移出回收站
export function  restore(id){
    return axios.get(`/api/admin/store/product/restore/${id}`)
}