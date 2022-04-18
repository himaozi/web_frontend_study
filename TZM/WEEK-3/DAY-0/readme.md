js中的代码并不完全是一行行按顺序执行下去的.很多方法是"异步",会在不确定的时间执行"回调函数"
你昨天学习的ajax就是这样的东西,ajax方法的第二个参数就是回调函数,就像你去窗口点菜一样,老板告诉你菜点好了,你先下去吧,等好了我喊你,回调函数就是"喊你".

看下边这段代码:

$.ajax('url1',function(data1){
    console.log('接口url1返回了data1的数据')
})

$.ajax('url2',function(data2){
    console.log('接口url2返回了data2的数据')
})

$.ajax('url3',function(data3){
    console.log('接口url3返回了data3的数据')
})
实际上并不能保证data1 data2 data3是按顺序返回的,由于接口复杂度,网络环境等等一系列因素,不同接口耗时是不同的.甚至是不稳定的,有时候可能是 data1---data2---data3 有时候又可能是data3----data2---data1.
那如果业务有个需求是这样的:请求url1,拿到data1后再去请求url2,url2的数据拿到之后再去请求url3,url3请求完了再去请求url4,再去请求url5...

在promise之前只能这么写.
$.ajax('url1',function(data1){
    console.log('接口url1返回了data1的数据')
    $.ajax('url2',function(data2){
        console.log('接口url2返回了data2的数据')
        $.ajax('url3',function(data3){
            console.log('接口url3返回了data3的数据')
            $.ajax('url4',function(data4){
                console.log('接口url4返回了data4的数据')
                $.ajax('url3',function(data3){
                    console.log('接口url3返回了data3的数据')
                })
            })
        })
    })
})

这样的代码是很有问题的,很丑陋,不容易维护,传说中的"回调地狱"就是这种情况.
promise就是一种全新的异步解决方案.promise是非常非常重要的工具,一定要熟练掌握.

https://www.runoob.com/js/js-promise.html
可以多搜搜promise的教程.