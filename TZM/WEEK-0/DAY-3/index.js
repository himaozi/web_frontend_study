// 以后每天的task 都这样统一写在一个文件就好了 (因为我用script标签把这个js文件连接到index.html里了)
// 不用一个任务建一个html~

/**
 * for example
 */
// task1
//函数名最好有一定的语义化 这是个好习惯
function add(a, b) {
  console.log(a + b);
}

test(1, 2);

//  task2
function minus(a, b) {
  console.log(a - b);
}

test2(3, 1);

// html点击事件调用的就是这个方法
function myAlert() {
  alert('hello world!');
}
