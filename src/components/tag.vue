<template>
  <span class="xd-tag">{{text}}</span>
</template>
<style>
.xd-tag {
  display: inline-block;
  padding: 0 5px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(255, 166, 28);
  border-radius: 4px;
  border: 1px solid rgb(255, 166, 28);
  white-space: nowrap;
  letter-spacing: .2px;
  margin-right: 7px;
  box-sizing: border-box;
}
</style>
<script>
  export default {
    props: ["text"]
  }
</script>