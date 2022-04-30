// 整体思路
// 首先页面有两种状态，一种是查询状态(显示筛选后的数据)，一种是非查询状态（显示全部数据 ）
// 不管是哪一种状态，页面的渲染思路都是根据拿到列表数据，根据拿到的书本总数数据计算出页码数并添加页码标签，生成对应分页的查询方式
// 而两种模式数据的区别在于获取数据时是否携带参数
// 因此统一把axios.get设置成带参数，通过更改参数book的信息达到是否带筛选条件的目的
// 在此基础上，封装两种获取当前页面的函数查询状态searchBooks(),非查询状态getBookList()

// 全局变量用于动态获取分页信息
var pageSize = 3
var pageCurrent = 1
var bookSum = 0
var PageSum = 1
// 用于判断分页状态是否在查询状态(1:非查询状态 2：查询状态)(可优化，每次发送带上book参数，每进行一次操作调整book参数的信息)
var buttonStatus = 1
// 书本参数用于存放ajax参数信息
var book = {
  id: '',
  type: '',
  name: '',
  description: '',
}

// 定义表格渲染函数
function tableGeneration_Page(data) {
  bookList = Array.from(data)
  // 清空表格
  $('table tbody').empty();
  content = '';
  for (i = 0; i < bookList.length; i++) {
    const book = bookList[i];
    content += `
           <tr id=${book.id}>
               <td>${book.id}</td>
               <td>${book.type}</td>
               <td>${book.name}</td>
               <td>${book.description}</td>
               <td>
                   <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1" onClick="editBook(${book.id})" data-whatever="${book.id}">编辑</button>
                   <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onClick="delBook(${book.id})">
                         删除
                       </button>
               </td>
           <tr>
       `;
    $('table tbody').html(content);
  }
}

// 定义分页渲染函数(首次请求数据请求分页的第一页，书本描述设置为'')
function pageGeneration(data) {
  // 如果分页栏数未自定义设置，每页显示3栏
  pageSize = $('.input_pageSize').val()
  if (pageSize === '') {
    pageSize = 3;
  }
  // 获取页码总数
  bookSum = data.length
  pageSum = Math.ceil(bookSum / pageSize)

  // 01清空页码
  $('.pagination').html('');
  let content = '';
  // 02生成页码标签
  for (i = 0; i < pageSum; i++) {
    content += `<li class="page-item"><button class="page-link" value=${i + 1
      }>${i + 1}</button></li> `;
  }
  $('.pagination').html(content);

  // 渲染当前页表格
  let newData = []
  for(i=0;i<pageSize;i++){
    newData[i]=data[i]
  }
  tableGeneration_Page(newData)
  

  // 设置点击不同页码渲染对应分页表格
  $('.page-link').click(function () {
    pageCurrent = this.value
    url = '/api/books' + '/' + pageCurrent + '/' + pageSize
    // 判断是查询状态还是其他状态
    // 非查询状态——不带参数直接获取数据
    if (buttonStatus === 1) {
      axios.get(url).then(function (res) {
        tableGeneration_Page(res.data.data.records)
      })
    }
    // 查询状态——获取查询条件并渲染对应分页
    else if (buttonStatus === 2) {
      var book = {
        type: $('#type').val(),
        name: $('#name').val(),
        description: $('#description').val(),
      };
      url = '/api/books' + '/' + pageCurrent + '/' + pageSize
      axios.get(url, { params: book }).then(function (res) {
        tableGeneration_Page(res.data.data.records)
      })
    }
  })
}





// 一：获取所有图书，渲染成表格
function getbookList() {
  axios.get('/api/books').then(function (res) {
    let bookList = Array.from(res.data.data);
    pageGeneration(bookList)
  });
  
}
getbookList();



//二： 删除图书
function delBook(id) {
  $('#confirm').click(function () {
    url = '/api/books' + '/' + id
    axios.delete(url).then(function (res) {
       //04 刷新列表
   if(buttonStatus===1){
    getbookList()
  }
  else if(buttonStatus===2){
    searchBooks()
  }
      $("#staticBackdrop").modal('hide')
    });
  })
}

// 三 编辑图书
function editBook(id) {

  // 01获取当前ID的图书信息
  url = '/api/books' + '/' + id;
  axios.get(url).then(function (res) {
    let bookList = res.data.data

    // 02获取当前图书的信息赋给输入框
    $('#editbooks_type').val(bookList.type)
    $('#editbooks_name').val(bookList.name)
    $('#editbooks_description').val(bookList.description)
    $('#edit_confirm').val(bookList.id)
  })
}
// 03点击确定按钮发送修改后数据(为了解决重复发送问题移到编辑函数外面)
$('#edit_confirm').bind('click', function () {
  let bookId = $('#edit_confirm').val()
  let book_edit = {
    id: `${bookId}`,
    type: $('#editbooks_type').val(),
    name: $('#editbooks_name').val(),
    description: $('#editbooks_description').val()
  }
  url = '/api/books'
  axios.put(url, book_edit).then(function (res) {
    //04 刷新列表
   if(buttonStatus===1){
     getbookList()
   }
   else if(buttonStatus===2){
     searchBooks()
   }
    $("#exampleModal1").modal('hide')
  })
}
)


//四 新增图书

// 点击确定按钮时获取输入框内容
$('#add_confirm').click(function () {
  book = {
    id: '',
    type: $('#addbooks_type').val(),
    name: $('#addbooks_name').val(),
    description: $('#addbooks_description').val()
  }
  // 判断数据是否已经输入
  if (!Object.values(book).every((v) => v == '')){
 // 推送图书数据
 url = '/api/books'
 axios.post(url, book).then(function (res) {
   // 刷新列表
   pageCurrent = 1
   buttonStatus = 1
   getbookList()

   // 关闭模态框并清空输入框内容
   $("#exampleModal2").modal('hide')
   $('#addbooks_type').val('')
   $('#addbooks_name').val('')
   $('#addbooks_description').val('')
  //  新建刷新列表后清空查询框的内容
   $('#type').val('')
   $('#name').val('')
   $('#description').val('')
 })
  }
  else{
    alert('请填写图书信息')
  }
 
})

//五：分页查询数据
function searchBooks() {
  // 获取输入信息
    book = {
    id :'',
    type: $('#type').val(),
    name: $('#name').val(),
    description: $('#description').val(),
  };
  // 确认图书信息是否已经输入
  if (!Object.values(book).every((v) => v == '')) {
    //发送数据并获取返回信息总数
    url = '/api/books' + '/' + 1 + '/' + 9999
    axios.get(url, { params: book }).then(function (res) {
      bookList = res.data.data.records
      if(res.data.data.total === 0){
        alert('您所查询的图书不存在！')
        buttonStatus = 1
        getbookList()
      }
      else{
        buttonStatus = 2
      pageGeneration(bookList)

      }
      
    });
  }
  else {
    alert('请填写图书信息')
  }
}


// 自定义栏数
function newList(){
  if(buttonStatus===1){
    getbookList()
  }
  else if(buttonStatus===2){
    searchBooks()
  }
}