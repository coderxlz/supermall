<template>
  <div class="recItem">
    <slot name = 'ico'></slot>
    <slot name = 'title'></slot>
  </div>
</template>

<script>

export default {
  name: "RecommendItem",
}
</script>

<style scoped>
  .recItem{
    flex-grow: 1;
  }
</style>