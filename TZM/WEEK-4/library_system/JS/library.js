// 获取所有图书，渲染成表格
function getbooklist() {
  axios.get('/api/books').then(function (res) {
    let booklist = Array.from(res.data.data);
    // 可以加个排序
    $('table tbody').empty();
    // for (i = 0; i < booklist.length; i++) {
    //   var tr = document.createElement('tr');
    //   document.getElementById('booktable').appendChild(tr);
    //   let index = 0;
    //   for (var k in booklist[i]) {
    //     var td = document.createElement('td');
    //     tr.appendChild(td);

    //     if (index < 4) {
    //       td.innerText = booklist[i][k];
    //     } else if (index == 4) {
    //       var button = document.createElement('button');
    //       td.appendChild(button);
    //       button.innerText = '编辑';
    //       button.onclick  = editBook;
    //     } else if (index == 5) {
    //       var button = document.createElement('button');
    //       td.appendChild(button);
    //       button.innerText = '删除';
    //       button.id = booklist[i].id;
    //       button.onclick  = delBook;
    //     }
    //     index++;
    //   }
    // }
    // 这种写法属于是 es6多行字符串+ jq 的写法 你上边的写法属于是原生的写法 有点繁琐 而且不太好用bootstrap的class组件
    let content = '';
    for (i = 0; i < booklist.length; i++) {
      const book = booklist[i];
      content += `
            <tr>
                <td>${book.id}</td>
                <td>${book.type}</td>
                <td>${book.name}</td>
                <td>${book.description}</td>
                <td>
                    <button class="btn btn-primary" onClick="editBook(${book.id})">编辑</button>
                    <button class="btn btn-primary" onClick="delBook(${book.id})">删除</button>
                </td>
            <tr>
        `;
    }
    // 这种直接用标签名在选择元素不 太合理, 比如你页面有多个table怎么办 一般用class 和 id选择器 优化下
    $('table tbody').html(content);
  });
}
// 装个code spell checker插件 会提示一些命名问题
// 一般命名都是小驼峰 小写开头 这个应该是getBookList更规范点
getbooklist();

// 删除图书
function delBook(id) {
  alert('你正在删除id为' + id + '的书籍');
}
// 编辑图书
function editBook(id) {
  alert('你编辑操作id为' + id + '的书籍');
}
$('button').click(function () {
  // // 获取要删除的书籍的id
  // let Params = $(this).id
  // console.log(Params)
  // let url ='http://106.14.162.86:8080/books/'+Params
  // axios.delete(url).then(function(){

  // })

  alert('点击生效');
});
// 删除接口生效测试
var url = '/api/books' + '106';
axios.delete(url).then(function () {});

// 编辑接口生效测试

var url = '/api/books';
var data = {
  creatTime: '',
  description: '',
  id: 106,
  name: '西游记',
  type: '',
  updateTime: '',
};
axios.put(url, data).then(function (res) {
  console.log('success');
});

// 增加数据接口生效测试
var url = '/api/books';
var data = {
  creatTime: '',
  description: '',
  id: 107,
  name: '西游记',
  type: '',
  updateTime: '',
};
axios.post(url, data).then(function (res) {
  console.log('success');
});

// 通过id获取数据测试
var url = '/api/books';
var Params = 106;

axios.get(url, { Params: Params }).then(function (res) {
  console.log('success');
});

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
