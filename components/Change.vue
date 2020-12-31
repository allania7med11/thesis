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
    ...mapActions(["increment"]),
    changeState() {
      this.increment(3)
    }
  }
};
</script>

<style>
</style>