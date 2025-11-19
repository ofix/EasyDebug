<template>
  <div id="app">
    <DefaultLayout />
  </div>
</template>

<script>
import DefaultLayout from "@/layout/DefaultLayout.vue";

export default {
  name: "EasyDebug",
  components: {
    DefaultLayout,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

// 覆盖 Element Plus 默认样式
.el-icon {
  font-size: 16px;
}

.el-button {
  transition: all 0.2s;
}
</style>
