<template>
  <div>
    
  </div>
</template>
<script>
import { reactive } from 'vue';

export default {
  setup(props) {
    const { state, removeItem } = this.useRemoveList();
    return {
      state, removeItem,
    };
  },
  // 将数据和业务逻辑抽离到一个函数里
  // 当函数里的逻辑过多时 也可以抽离为单独的js文件
  useRemoveList() {
    const state = reactive({
      list: [1, 2, 3],
    });
    const removeItem = (index) => {
      state.list.splice(index, 1);
    };
    return {
      state, removeItem,
    };
  },
}
</script>