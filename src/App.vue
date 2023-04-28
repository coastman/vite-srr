<template>
  <div class="root">
    <client-only>
      <vue-progress-bar />
    </client-only>
  
    <layout />
  </div>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Index.vue'
</script>

<style scoped lang="less">
.root {

}
</style>
