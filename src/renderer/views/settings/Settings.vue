<template>
    <div class="page page-settings">
    </div>
</template>

<script>
import MixinLoading from "@/components/mixins/MixinLoading";
export default {
    name: "Settings",
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

<style lang="scss" scoped></style>