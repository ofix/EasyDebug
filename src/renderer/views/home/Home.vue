<template>
  <div class="page page-home">我是小傻瓜</div>
</template>

<script>
import MixinLoading from "@/components/mixins/MixinLoading";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {},
  mixins: [MixinLoading],
  created() {
    this.showLoadingBar();
  },
  mounted() {
    // 打印 Electron 相关版本信息
    console.log("Node.js 版本:", window.versions.node());
    console.log("Chromium 版本:", window.versions.chrome());
    console.log("Electron 版本:", window.versions.electron());
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
