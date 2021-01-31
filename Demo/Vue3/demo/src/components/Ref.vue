<template>
  <div>
    <span @click="addCount">{{count}}</span>
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
  useAddCount() {
    let count = ref(0);
    const addCount = () => {
      count += 1;
    };
    return {
      count, addCount,
    };
  },
};
</script>

<style>

</style>