// 获取所有图书，渲染成表格
function getbooklist(){
    axios.get('http://106.14.162.86:8080/books').then(function(res){
        let booklist = Array.from(res.data.data )
        // 可以加个排序
        $('table tbody').empty()
        for(i = 0; i < booklist.length; i++){
            var tr = document.createElement('tr')
            document.getElementById('booktable').appendChild(tr);
            let index = 0
            for (var k in booklist[i]){
                
                var td = document.createElement('td');
                tr.appendChild(td);
                
               if(index<4){
                td.innerText =  booklist[i][k];

               }
               else if(index==4){
                   var button = document.createElement('button')
                   td.appendChild(button)
                   button.innerText='编辑'
                   

                   
               }
               else if(index==5){
                var button = document.createElement('button')
                td.appendChild(button)
                button.innerText='删除'
                button.id=booklist[i].id
               

               }
               index++

               
                
            
                

            }
           
            
        }

    })
}
getbooklist()

// 删除图书

$("button").click(function(){
    
        // // 获取要删除的书籍的id
        // let Params = $(this).id
        // console.log(Params)
        // let url ='http://106.14.162.86:8080/books/'+Params
        // axios.delete(url).then(function(){
    
        // })
    
    alert('点击生效')
    

})
// 删除接口生效测试
var url = '/api/books/'+'106'
   axios.delete(url).then(function(){
    
        })

// 编辑接口生效测试

var url ='http://106.14.162.86:8080/books'
var data = {
    "creatTime": "",
	"description": "",
	"id": 106,
	"name": "西游记",
	"type": "",
	"updateTime": ""
}
axios.put(url,data).then(function(res){
    console.log('success')
})

// 增加数据接口生效测试
var url ='http://106.14.162.86:8080/books'
var data = {
    "creatTime": "",
	"description": "",
	"id": 107,
	"name": "西游记",
	"type": "",
	"updateTime": ""
}
axios.post(url,data).then(function(res){
    console.log('success')
})


// 通过id获取数据测试
var url ='http://106.14.162.86:8080/books'
var Params = 106

axios.get(url,{Params:Params}).then(function(res){
    console.log('success')
})


// // 新增图书
// function addbooks(data){
//     let bookObj = {}
//     bookObj = {
//         type : $('#addbooks_type').val(),
//         name : $('#addbooks_name').val(),
//         description : $('#addbooks_description').val(),
//         id:data.length+1
//     }
//     axios.post('http://106.14.162.86:8080/books',{book:bookObj}).then(function(res){
//         console.log(res.data)
//     })
// }
// let bookObj = {
//     type : '5',
//     name : '1',
//     description :'test',
//     id:999
// }
// axios.post('/api/books',{
//     id:108,
//     name:'22',
//     type:'33'
// }).then(function(res){
//         console.log(res.data)
//     })

// $.get('http://www.liulongbin.top:3006/api/getbooks', function(res) {
//         // 2. 获取列表数据是否成功
//         if (res.status !== 200) return alert('获取图书列表失败！')
//         // 3. 渲染页面结构
//         var rows = []
//         console.log(res.data)})



// axios.get('/api/books')
// .then(function (res) {
//     $('table tbody').append('<tr></tr>')
//     let tableData=res.data[1]

    
// $('table tbody').append('<th scope="row">1</th><td></td><td>Otto</td><td>@mdo</td><td><button type="button" class="btn btn-primary" data-toggle="modal"data-target="#exampleModalCenter">编辑</button>  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">删除</button>')
   

// })


// $('button').click(function getTableList() {
//     var search = {
//         type:$('#type').val(),
//         bookname:$('#bookname').val(),
//         description:$('#description').val()}
//         console.log(search)
//     let column = 1
//     let val = 1
//     let url = 'http://106.14.162.86:8080/books/'+column+'/'+val

//     if (search.type !== '' || search.name !== '' || search.description !== '') {
//         let column = 1
//         let val = 1
    
//         axios.get(url, { Params: search })
//             .then(function (res) {
//                 console.log(res.data.data.records[0])

               

//             })

//     }

// })

// function tableUI(data){
//     var data = {size:1}
//     $('#table').empty()
//     for(i=0; i<data.size;i++){
//         $('#table').append('<tr><td>这是新增的元素<td><tr>')
//     }
                    



