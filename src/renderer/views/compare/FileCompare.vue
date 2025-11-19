<template>
    <div class="page page-file-compare">
     
    </div>
  </template>
  
  <script>
  import MixinLoading from "@/components/mixins/MixinLoading";
  export default {
    name: "FileCompare",
    data() {
      return {
       
      };
    },
    computed: {
     
    },
    mixins: [MixinLoading],
    created() {
      this.showLoadingBar();
    },
    methods: {
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  