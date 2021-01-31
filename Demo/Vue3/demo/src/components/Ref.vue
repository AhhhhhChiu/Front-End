<template>
  <div>
    <span @click="addCount">use: {{count}}</span>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      ...useAddCount(),
    };
  },
};
const useAddCount = () => {
  let count = ref(0);
  const addCount = () => {
    count.value += 1;
  };
  return {
    count, addCount,
  };
};
</script>

<style>

</style>