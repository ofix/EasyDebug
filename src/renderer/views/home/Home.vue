<template>
    <div class="page page-home">
     
    </div>
  </template>
  
  <script>
  import MixinLoading from "@/components/mixins/MixinLoading";
  export default {
    name: "Home",
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
  