<template>
  <div class="home">
    <div>
      <img class="robot" src="../assets/robot-home.png" aria-hidden="true" />
    </div>
    <div class="get-started">
      <a href="">Get started</a> building your first robot!
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HomePage',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
  
}
.robot {
  height: 300px;
}
</style>
