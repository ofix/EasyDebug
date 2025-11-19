<template>
    <div class="page page-code-generator">
     
    </div>
  </template>
  
  <script>
  import MixinLoading from "@/components/mixins/MixinLoading";
  export default {
    name: "CodeGenerator",
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
  