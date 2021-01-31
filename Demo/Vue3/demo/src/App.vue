<template>
  <div>
    <HelloWorld /><Ref />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Ref from './components/Ref.vue';

export default {
  name: 'App',
  components: {
    HelloWorld, Ref,
  }
}
</script>
