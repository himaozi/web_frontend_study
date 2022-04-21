<template>
  <main>
    <div id="app" class="app">
       <button class="button-info" v-on:click="mockTest">
        <span>测试</span>
      </button>
      <label>
        <input class="input-add" v-model="message" />
      </label>
      <button class="button-info" v-on:click="addItem(message)">
        <span>添加</span>
      </button>
      <!-- 分割线hr 换行br-->
      <hr />
      <!--todo icon 置顶-->
      <div>置顶</div>
      <ul>
        <todo-item
          v-for="item in sortStarList"
          v-bind:item="item"
          :key="item.id"
          @toggleStar="toggleStar"
          @deleteItem="deleteItem"
          @toggleCompleted="toggleCompleted"
        ></todo-item>
      </ul>
      <hr />
      <ul>
        <todo-item
          v-for="item in sortTodoList"
          v-bind:item="item"
          :key="item.id"
          @toggleStar="toggleStar"
          @deleteItem="deleteItem"
          @toggleCompleted="toggleCompleted"
        ></todo-item>
      </ul>
    </div>
  </main>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import axios from 'axios';
export default {
  name: "TodoMain",
  components: {
    TodoItem,
  },
  data() {
    return {
      // todo 在created 的生命周期时 请求后端服务初始化
      starList: [],
      todoList: [],
    };
  },
  created(){
    console.log('created')
    axios.get('/todo-items')
    .then((response) => {
      this.starList = response.data.rows
    })
    .catch((error) => console.error(error))
    .then(() => console.log('created done'))
  },
  methods: {
    removeElm(array, item) {
      array.splice(array.indexOf(item), 1);
    },
    // 成功才执行添加，失败不添加
    addItem: function (message) {
      const item = {
          id:Date.now(),
          message: message,
          star: false,
          completed: false
        }  
      axios.post('/todo-item',item)
      .then(response => {
       if('01'=== response.data.result){
         this.todoList.push(item)
       }else{
         console.error('add error')
       }
      })
      .catch(error => console.error(error))
    },
    toggleStar: function (item) {
      // todo 调用put /todo-item
      item.star = !item.star;
      axios.put('/todo-item',item)
      .then(response => {
        if ('01' === response.data.result){
          if (item.star) {
            this.removeElm(this.todoList, item);
            this.starList.push(item);
          } else {
            this.removeElm(this.starList, item);
            this.todoList.push(item);
          }
        }
        else{
          console.error('更新item 异常', item)
        }
      })
      .catch(error => console.error(error))
    },
    deleteItem: function (item) {
      // todo 调用delete /todo-item
      // todo 是否需要再请求list，还是通过/todo-item 接口返回？
      axios.delete('/todo-item',item).then(
        response => {
           if ('01' === response.data.result){
            item.star
            ? this.removeElm(this.starList, item)
            : this.removeElm(this.todoList, item);
            console.log("delete item");
           }
           else{
             console.error('delelte item error')
           }
        }
      ).catch(console.error)
       
    },
    toggleCompleted: function (item) {
      axios.post('/todo-item',item).then(
        response => {
          if ('01' === response.data.result){
            item.completed = !item.completed;
            console.log('toggleCompleted success')
          }
        }
      )
    },
  },
  computed: {
    //todo 排序数组
    sortStarList() {
      return this.starList.slice(0).sort((a, b) => a.createTime - b.createTime);
    },
    sortTodoList() {
      return this.todoList.slice(0).sort((a, b) => a.createTime - b.createTime);
    },
  },
};
</script>

<style>
</style>