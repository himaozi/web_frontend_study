const tableData = [
  {
    name: 'liming',
    age: 23,
    address: '大连',
  },
  {
    name: '小李',
    age: 23,
    address: '广西',
  },
  {
    name: '阿江',
    age: 20,
    address: '山东',
  },
];

// task1
function reduce(){
  document.getElementById("result").value--
}

function add(){
  document.getElementById("result").value++
 }
 

//  task2
function tableFunction(){
  for(i = 0; i < tableData.length; i++){
    var tr = document.createElement('tr')
  document.getElementById('ta').appendChild(tr);
  for(var k in tableData[i]) {
    var td = document.createElement('td')
    tr.appendChild(td)
    td.innerText = tableData[i][k]

  } 
  }
  
}


// task 3
function addList(){
 var newli = document.createElement('li')
 newli.innerText = document.getElementById('todolist').value
 document.getElementById('tb').appendChild(newli)
}

function myclearAll(){
  var ele = document.getElementById('tb')
 while(ele.firstChild){
   ele.removeChild(ele.firstChild)
 }
}


// 方法二
// function myclearAll(){
//   document.getElementById('tb').innerHTML= " "
// }