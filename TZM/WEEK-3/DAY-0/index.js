// 作业promise的使用

//color: red / green /yellow
function light(color) {
  console.log(color + '灯亮了');
}

// 作业-0
// 用promise 实现一个红绿灯控制函数 1秒后红灯亮 红灯亮2秒后 绿灯亮.
function trafficLights() {
  new Promise(function (resolved, reject) {
    setTimeout(light('red'), 1000);
  }).then(setTimeout(light('green'), 2000));
  // to do
}

trafficLights();

// 这道题做的是不对的, 你如果看下控制台你就知道你的不满足需求了 (1秒后红灯亮 黄灯亮2秒后 绿灯亮)
// 尝试理解下面的话:
// 1.promise传入一个方法,此方法有2个参数 第一个是resolved 第二个是 reject

// resolved调用之后 .then里的方法才开始执行. 如果reject

/**
 * 尝试理解下面的话:
 * 1.promise传入一个方法A,此方法有2个参数 第一个是resolved 第二个是 reject 此方法立即执行
 * 2.promise.then也传入一个方法B 等待恰当的时机执行
 * 3.当方法A里的逻辑执行了 resolved,此时开始执行方法B.
 * 4.当方法A里的逻辑执行了 reject此时then里的方法B不能执行,如果.then后边设置了.catch就会执行catch里的方法.
 *
 */
// 例子1
new Promise(function (resolve, reject) {
  // 1秒后执行了resolve resolve是可以传递值的
  setTimeout(() => {
    resolve(1);
  }, 1000);
})
  .then(function (data) {
    console.log(data); // data的值是1 注意第37行代码 传入了1
    // 因为resolve执行了  此时代码进到了这里!!!
  })
  .catch(function () {
    // 这里不会进来 因为reject没有执行(除了reject执行外 如果代码里出现了语法错误或者其他错误也会走到这里)
  });

// 例子2
new Promise(function (resolve, reject) {
  // 1秒后执行了 reject
  setTimeout(() => {
    reject();
  }, 1000);
})
  .then(function (data) {
    // 因为 reject 执行了  代码不会进到这
  })
  .catch(function () {
    // 因为 reject 执行了  代码到了这里!!!!!
  });

// 这道题应该这样写
function trafficLightsV2() {
  return new Promise(function (res, rej) {
    setTimeout(() => {
      res();
    }, 1000);
  })
    .then(function () {
      light('red');
      return new Promise(function (res, rej) {
        setTimeout(() => {
          res();
        }, 2000);
      });
    })
    .then(function () {
      light('yellow');
      return new Promise(function (res, rej) {
        setTimeout(() => {
          res();
        }, 1000);
      });
    })
    .then(function () {
      light('green');
    });
}

trafficLightsV2()

// 作业-1
// 理解下 promise.all  promise.race promise.any 这3个方法
// 暂不设置作业了,以后碰到了有印象就行.
