<template>
  <div id="app">
  <header>
      <nav>
        <ul>
          <li class="nav-item">
            <img class="logo" src="./assets/build-a-bot-logo.png" />
            Build-a-bot
            </li>
        </ul>
      </nav>
  </header>
  <main>
    <RobotBuilder />
  </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HomePage from './home/HomePage.vue';
import RobotBuilder from './build/RobotBuilder.vue';
export default Vue.extend({
  name: 'app',
  components: {
    RobotBuilder,
  },
});
</script>

<style>
body{
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>
<style scoped>
/* .content /deep/ .robot-name {  */
/* .content >>> .robot-name {  */
.content .robot-name { 
  color: red;
  border: 2px solid blue;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

main {
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  width: 1024px;
  min-height:  300px;
}

header {
  background-color: #999;
  width: 1084px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}

</style>
