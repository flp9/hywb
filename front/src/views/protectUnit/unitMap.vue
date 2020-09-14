<template>
    <el-main class="emap">
        <!--        地图可操作-->
        <emap-main></emap-main>
        <!--        地图不可操作-->
<!--        <emap-main :handelMarkFlag="false"></emap-main>-->
    </el-main>
</template>

<script>
    import EmapMain from "../../components/EMap/emapMain";
    export default {
        name: "unitMap",
        components: {EmapMain},
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {},
        computed: {},
        watch: {},
        methods: {
        },

    }
</script>

<style scoped>
    .emap{
        height: 100%;
        padding: 0 5px 10px 10px!important;
        background-color: #efefef;
        overflow: hidden;
        box-sizing: border-box;
    }
</style>
