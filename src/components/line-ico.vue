<template>
  <span class="line-ico">
    <span class="my-ico"></span>
    <span style="font-size: 16px">{{lineText}}</span>
  </span>
</template>
<style>
  .line-ico .my-ico{
    display: inline-block;
    width: 3px;
    height: 14px;
    background: rgb(57,182,254);
    margin-right: 5px;
  }
</style>
<script>
  export default {
    components: {
    },
    props: ['lineText'],
    methods:{
    },
    mounted () {
    }
  }
</script>
