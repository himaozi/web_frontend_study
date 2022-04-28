// 封装表格渲染函数
function tableGeneration(data, pageSize, PageCurrent) {
  $('table tbody').empty();
  content = ''
  for (i = 0; i < pageSize; i++) {
    var k = i + pageSize * (PageCurrent - 1)
    if (k < data.length) {
      const book = data[k];
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
    $('table tbody').html(content);

  }

}


// 定义分页渲染函数
function pageGeneration(data, pageSize, PageCurrent) {
  let pageSum = Math.ceil(data.length / pageSize)
  if (pageSize === null) {
    pageSize = 3
  }
  // 根据输入的数据条数动态生成页码标签个数
  // 01清空页码
  $('.pagination').html('')
  let content = ''
  // 02生成页码标签
  for (i = 0; i < pageSum; i++) {
    content +=
      `<li class="page-item"><button class="page-link" value=${i + 1}>${i + 1}</button></li> `
  }
  $('.pagination').html(content)

  // 渲染默认状态下的表格
  tableGeneration(data, pageSize, PageCurrent)
  // 点击页码渲染对应分页表格
  $('button').click(function () {
    PageCurrent = this.value
    console.log(PageCurrent)
    tableGeneration(data, pageSize, PageCurrent)
  })

}



// 获取所有图书，渲染成表格
function getBooklist() {
  axios.get('/api/books').then(function (res) {
    let booklist = Array.from(res.data.data);
    // 可以加个排序
    pageGeneration(booklist, 3, 1)
  });
}
getBooklist();






//分页查询数据
function searchBooks() {
  // 获取输入信息
  var book = {
    id: '',
    type: $('#type').val(),
    name: $('#name').val(),
    description: $('#description').val(),
    creatTime: '',
    updateTime: ''

  }
  // 确认图书信息是否已经输入
  if (!Object.values(book).every(v => v == '')) {
    // 有信息则发送数据

    //01 获取当前页码（待完善函数）


    // 02 发送数据
    url = '/api/books' + '/' + currentPage + '/' + PageSize
    axios.get(url, { Params: book }).then(function (res) {
      let booklist = Array.from(res.data.data);


    // 03  接收数据后渲染表格


    });
  }
  else {
    alert('请填写图书信息')
  }
}



// 删除图书
function delBook(id) {
  alert('你正在删除id为' + id + '的书籍');

}


// 编辑图书
function editBook(id) {
  alert('你编辑操作id为' + id + '的书籍');
  // 获取当前ID的图书信息
  url = '/api/books' + '/' + id
  axios.get(url).then(function (res) {
    return a = res.data.data

  })
  console.log(a)
}










// 删除接口生效测试
var url = '/api/books/' + '108';
axios.delete(url).then(function (res) {
  console.log('删除success')
})

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
  console.log('编辑success');
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
  console.log('增加success');
});

// 通过id获取数据测试
var url = '/api/books';
var Params = 106;

axios.get(url, { Params: Params }).then(function (res) {
  console.log('id查询success');
});








