<template>
  <li>
    {{item.completed}}
    <input
      type="checkbox"
      name="completed"
      :value="item.completed"
      :checked="item.completed"
      @click="$emit('toggleCompleted', item)"
    />
    <span :class="[{ itemCompleted: item.completed }]">{{ item.message }}</span>
    <!--todo star icon-->
    <!-- 通知父级组件 -->
    <button class="button-warning" @click="$emit('toggleStar', item)">
      {{ starMesage }}
    </button>
    <button class="button-danger" @click="$emit('deleteItem', item)">
      删除
    </button>
  </li>
</template>

<script>
export default {
  //定义组件名称
  name: "TodoItem",
  // 父级的数据只能访问？不能修改？
  props: ["item"],
  emits: ["toggleStar", "deleteItem", "toggleCompleted"],
  computed: {
    starMesage() {
      return this.item.star ? "取消" : "置顶";
    },
  },
};
</script>

<style>
.itemCompleted {
  text-decoration: line-through;
}
.button-default {
  margin: 10px auto;
  width: 15%;
}
/* General Buttons */
.button-info {
  width: 15%;
  background-color: #4eb5e5;
  color: white;
  border: 2px #4eb5e5;
  /* W3C */
}

.button-warning {
  margin: 10px auto;
  color: white;
  width: 15%;
  background-color: orange;
  border: orange;
}

.button-danger {
  margin: 10px auto;
  color: white;
  width: 15%;
  background-color: red;
  border: red;
  /* W3C */
}
</style>