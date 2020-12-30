<template>
  <div>
    <h1>Change</h1>
    <button @click="changeState">Increment</button>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  methods: {
    ...mapActions(["login"]),
    changeState() {
      this.$store.commit('increment', 3)
      console.log(this.$store.state.count)
    }
  }
};
</script>

<style>
</style>