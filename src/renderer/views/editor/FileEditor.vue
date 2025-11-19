<template>
    <div class="page page-code-generator">

    </div>
</template>

<script>
import MixinLoading from "@/components/mixins/MixinLoading";
import { useEditorStore } from '@/store/editor'
export default {
    name: "FileEditor",
    data() {
        return {

        };
    },
    computed: {

    },
    mixins: [MixinLoading],
    setup() {
        const editor = useEditorStore()
        return { editor }
    },
    created() {
        this.showLoadingBar();
    },
    methods: {
    },
};
</script>

<style lang="scss" scoped></style>