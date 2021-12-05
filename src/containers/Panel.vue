<template>
  <div class="panel">
    <div v-if="$slots.header" class="panel-header">
      <slot name="header" />
    </div>
    <div class="panel-content">
      <slot name="content" />
    </div>
  
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.panel {
  .panel-header {
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 3px 3px 0 0;
  }
  .panel-content {
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    padding: 10px;
    min-height: 200px;
  }
}
</style>