const Mock = require("mockjs");

const successResponse = {
    result:'01',
    resultCode:'000000',
    resultMessage:'处理成功'
}
Mock.mock(
'/todo-items',{
    result:'01',
    resultCode:'0000',
    resultMessage:'',
    rows:[
        {
            id: 0,
            message: "test1",
            star: true,
            completed: false,
          },
          {
            id: 1,
            message: "test2",
            star: true,
            completed: false,
          },
          {
            id: 2,
            message: "test3",
            star: true,
            completed: false,
          },
    ]
}
)
// mock update 
    // 1. complete
    // 2. star

// mock delete
// mock create

// type 为小写
Mock.mock('/todo-item','post',successResponse)
Mock.mock('/todo-item','put',successResponse)
Mock.mock('/todo-item','delete',successResponse)

