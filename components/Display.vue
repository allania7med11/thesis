<template>
  <div>
    <h1>Display</h1>
    <div>Count: {{count}}</div>
    <div>Count2x: {{count2x}}</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
computed:{
  ...mapState(["count","count2x"]),
  ...mapGetters(["count2x"])
}
}
</script>

<style>

</style>