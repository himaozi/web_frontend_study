
  
// 清零
function myClear(){
    document.getElementById('xianshi').value = ''
    result = 0

}

// 获取值
function get(value){
    document.getElementById('xianshi').value += value

}

// 计算 方法一，用了eval
// function calculate(){
//     let result = 0
//     result = document.getElementById('xianshi').value
//     document.getElementById('xianshi').value = ''
//     document.getElementById('xianshi').value = eval(result)
// }


// https://qdmana.com/2021/07/20210709175431534Z.html
// 方法二 相对完善且不用eval的可以连续 计算的方法，有太多没啃的知识点，看了几遍还是觉得代码读不下去 ，先放着后面再来看


// // 方法三，不能连续计算，没有考虑不按理想情况输入（num1 opt num2）的状况
// function calculate(){
//     let result = 0
//     result = document.getElementById('xianshi').value
//     // 得到数组
//     let a = Array.from(document.getElementById('xianshi').value)
//     console.log(a)
//     // 得到运算符位置
//     let pos = 0
//     let num1 = ''
//     let num2 = ''
//     a.forEach(function(item, index){
       
//     if (item === '+' || item === '-' || item === '*' || item === '/' ){
//         pos = index
//         console.log(pos)
//     }
//     })

//     // 得到数值和运算符

//     num1 = parseFloat(result.substring(0, pos))
//     opt = a[pos]
//     console.log(opt)
//     num2 = parseFloat(result.substring(pos+1, a.length))

//     switch(opt){
//         case '+' :
//             result = num1 + num2
//             break
//         case '-':
//                 result = num1 - num2
//                 break
//         case '*':
//                     result = num1 * num2
//                     break
//         case '/':
//                         result = num1 / num2
//                         break
//         default:
//                             result = '错误'
//                             break
                

//     }
//     document.getElementById('xianshi').value = result

// }

// 方法四 在三的基础上可以连续计算,但是只能是按顺序运算，没有加减乘除优先级
function cal(r, n, o){
    switch(o){
                case '+' :
                    r = r + n
                    break;
                case '-':
                    r = r - n
                    break;
                case '*':
                    r = r * n
                    break;
                case '/':
                     r = r / n
                    break;
                default:
                    r = '错误'
            }
            return r
           
}

function calculate(){
    let input = document.getElementById('xianshi').value
    let result = 0
    let next = 0
    let opt = ''
    var start = 0
    //得到数组
    let a = Array.from(document.getElementById('xianshi').value)
    a.forEach(function(item, index){
        if(item === '+' || item === '-' || item === '*' || item === '/'){
            next = parseFloat(input.substring(start, index))
            console.log(next)
            start = index+1 
            
            console.log(opt)
            if(result !== 0){
                console.log(result, next, opt)

                result = cal(result, next, opt)
                console.log(result, next, opt)
            
            }
            else if(result === 0){
                result = next + 0
            }
            opt = item
           
        }
        // 处理最后一个运算符后面的字符串
        else if(index === a.length-1){
            next = parseFloat(input.substring(start, index+1))
            result = cal(result, next, opt)
            console.log(next)
        }

    })
         
    document.getElementById('xianshi').value = result

}
