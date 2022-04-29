// 全局变量用于动态获取分页信息
var pageSize =$('.input_pageSize').val()
var pageCurrent = 1
// 封装表格渲染函数
// function tableGeneration(data, pageSize, pageCurrent) {
//   $('table tbody').empty();
//   content = '';
//   for (i = 0; i < pageSize; i++) {
//     var k = i + pageSize * (pageCurrent - 1)
//     if (k < data.length) {
//       const book = data[k];
//       content += `
//           <tr id=${book.id}>
//               <td>${book.id}</td>
//               <td>${book.type}</td>
//               <td>${book.name}</td>
//               <td>${book.description}</td>
//               <td>
//                   <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick="editBook(${book.id})">编辑</button>
//                   <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onClick="delBook(${book.id})">
//                         删除
//                       </button>
//               </td>
//           <tr>
//       `;
//     }
//     $('table tbody').html(content);
//   }
// }




// 定义分页渲染函数(待完善成分页请求，首次请求数据请求分页的第一页，书本描述设置为'')
function pageGeneration(data) {
  
  if (pageSize === '') {
    pageSize = 3;
  }
  // 获取页码总数
  let pageSum = Math.ceil(data.length / pageSize)
  // 根据输入的数据条数动态生成页码标签个数
  // 01清空页码
  $('.pagination').html('');
  let content = '';
  // 02生成页码标签
  for (i = 0; i < pageSum; i++) {
    content += `<li class="page-item"><button class="page-link" value=${i + 1
      }>${i + 1}</button></li> `;
  }
  $('.pagination').html(content);

  // 渲染默认状态下的表格
  tableGeneration_Page(pageSize, 1)
  // 点击页码渲染对应分页表格
  $('.page-link').click(function () {
    pageCurrent = this.value
    tableGeneration_Page()
    console.log(pageCurrent)
  })

}

// 获取对应分页的数据并渲染表格
function tableGeneration_Page() {
  url = '/api/books' + '/' + pageCurrent + '/' + pageSize
  axios.get(url).then(function (res) {
    bookList = res.data.data.records
    console.log(bookList)
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
                    <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick="editBook(${book.id})">编辑</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onClick="delBook(${book.id})">
                          删除
                        </button>
                </td>
            <tr>
        `;

      $('table tbody').html(content);
    }

  })
}

// 一：获取所有图书，渲染成表格
function getbookList() {
  pageSize =$('.input_pageSize').val()
  axios.get('/api/books').then(function (res) {
    let bookList = Array.from(res.data.data);
    console.log(pageSize)
    pageGeneration(bookList)
  });
}
getbookList();



//二： 删除图书
function delBook(id) {
  $('#confirm').click(function () {
    url = '/api/books' + '/' + id
    axios.delete(url).then(function (res) {
      console.log('点击生效')
      $("#staticBackdrop").modal('hide')
      tableGeneration_Page()



    })
   
  })


}

// 三 编辑图书
function editBook(id) {

  // 获取当前ID的图书信息
  url = '/api/books' + '/' + id;
  axios.get(url).then(function (res) {
    var bookList = res.data.data

    // 获取当前图书的信息赋给输入框
    $('#addbooks_type').val(bookList.type)
    $('#addbooks_name').val(bookList.name)
    $('#addbooks_description').val(bookList.description)

    // 点击确定按钮发送修改后数据
    $('.btn-primary').click(function () {
      var book = {
        id: `${id}`,
        type: $('#addbooks_type').val(),
        name: $('#addbooks_name').val(),
        description: $('#addbooks_description').val()
      }
      url = '/api/books'
      axios.put(url, book).then(function (res) {
        // 成功后关闭模态框
        $("#exampleModal").modal('hide')
        // 刷新列表
        tableGeneration_Page()
      })


    })

  })


}


//四 新增图书
function addBook() {
  // 点击确定按钮时获取输入框内容
  $('.btn-primary').click(function () {
    var book = {
      // id:id,
      type: $('#addbooks_type').val(),
      name: $('#addbooks_name').val(),
      description: $('#addbooks_description').val()
    }
    url = '/api/books'
    axios.post(url, book).then(function (res) {
      console.log(res.data)
      $("#exampleModal").modal('hide')
      tableGeneration_Page()
    })





  })
}

//五：分页查询数据
function searchBooks() {
  // 获取输入信息
  var book = {
    type: $('#type').val(),
    name: $('#name').val(),
    description: $('#description').val(),
  };
  // 确认图书信息是否已经输入
  if (!Object.values(book).every((v) => v == '')) {
    // 有信息则发送数据
    console.log(book)

    //01 获取当前页码（待完善函数）
    var pageCurrent = 1
    var pageSize = 3

    // 02 发送数据
    url = '/api/books/1/3'
    axios.get(url, { params: book }).then(function (res) {
      let bookList = Array.from(res.data.data);
      console.log('查询 成功')


      // 03  接收数据后渲染表格
      pageGeneration(bookList, pageSize, pageCurrent)


    });
  }
  else {
    alert('请填写图书信息')
  }
}