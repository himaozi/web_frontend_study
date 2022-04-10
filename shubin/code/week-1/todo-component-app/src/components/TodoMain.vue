<template>
  <main>
    <div id="app" class="app">
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
          v-for="item in starList"
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
          v-for="item in todoList"
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
export default {
  name: "TodoMain",
  components: {
    TodoItem,
  },
  data() {
    return {
      //   item: {
      //     id: 0,
      //     message: "",
      //     star: false,
      //     completed: false,
      //   },
      starList: [
        {
          id: 0,
          message: "test1",
          star: true,
          completed: false,
        },
        {
          id: 1,
          message: "test2",
          star: true,
          completed: false,
        },
        {
          id: 2,
          message: "test3",
          star: true,
          completed: false,
        },
      ],
      todoList: [],
    };
  },
  methods: {
    removeElm(array, item) {
      array.splice(array.indexOf(item), 1);
    },
    addItem: function (message) {
      this.todoList.push({
        message: message,
        star: false,
        completed: false,
      });
    },
    toggleStar: function (item) {
      item.star = !item.star;
      if (item.star) {
        this.removeElm(this.todoList, item);
        this.starList.push(item);
      } else {
        this.removeElm(this.starList, item);
        this.todoList.push(item);
      }
    },
    deleteItem: function (item) {
      item.star
        ? this.removeElm(this.starList, item)
        : this.removeElm(this.todoList, item);
      console.log("delete item");
    },
    toggleCompleted: function (item) {
      item.completed = !item.completed;
    },
  },
  computed: {
    //todo 排序数组
  },
};
</script>

<style>
</style>