<template>
  <div>
    <ul>
      <li v-for="item in state.list" :key="item.name">{{item.name}} -- {{item.age}}</li>
    </ul>
  </div>
</template>

<script>
// reactive使用了ES6中的Proxy实现
// 参数只能是Array/Object 否则修改不会更新界面
import { reactive } from 'vue';

export default {
  // 在beforeCreated前创建
  // 只能为同步 不能为异步
  setup(props) {
    console.log(this); // undefined
    const state = reactive({
      list: [
        { name: 'a', age: 1 },
        { name: 'b', age: 2 },
        { name: 'c', age: 3 },
      ],
    });
    return {
      state,
    };
  },
};
</script>