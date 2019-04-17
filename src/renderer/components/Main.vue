<template>
  <div id="wrapper">
    <div class="top-bar">
      <span>风一样的勇士</span>
      <img class="avatar" src="https://i.loli.net/2019/04/17/5cb6e586879ed.png" alt="avatar">
    </div>
    <main>
      <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue" width="20%"> -->
      <!-- <system-information></system-information> -->
      <div class="title">Bank Simulator</div>
      <div class="transactions">
        <div class="transaction-type">
          <div class="item-title">Transaction type</div>
          <v-select :options="['deposit', 'withdraw', 'transfer', 'update']"></v-select>
        </div>
        <div class="transaction-amount">
          <div class="item-title">Transaction amount</div>
          <input class="amount" v-model="amount" placeholder="100">
        </div>
        <div class="confirm-button">Confirm</div>
      </div>
    </main>
    <footer>
      Team Offline Flower! Made with love ©2019
    </footer>
  </div>
</template>

<script>
import SystemInformation from './Main/SystemInformation'

export default {
  name: 'landing-page',
  components: { SystemInformation },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
@import "./../../../node_modules/vue-select/dist/vue-select.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgb(23, 50, 170) 50%,
    rgb(140, 25, 207) 100%
  );
  height: 100vh;
  padding: 10px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

.top-bar {
  display: inline-block;
  color: #ffffff;
  padding-top: 5px;
  padding-bottom: 15px;
  width: 100%;
  text-align: right;
  font-size: 14px;
  vertical-align: middle;
}

.top-bar .avatar {
  background: #ffffff;
  border-radius: 100px;
  width: 26px;
  height: 26px;
  vertical-align: middle;
  margin-bottom: 8px;
  margin-left: 6px;
}

main {
  padding: 15px;
  height: 90%;
  background-color: #fff;
  border: 5px solid #fff;
  border-radius: 5px;
}

.title {
  color: #2c3e50;
  font-size: 36px;
  font-weight: bolder;
  margin-bottom: 6px;
  margin-top: 120px;
}

.transactions {
  margin-top: 120px;
}

.transactions .item-title {
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.transactions .amount {
  width: 100%;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #2942ad;
  margin-top: 10px;
  border-radius: 5px;
  color: grey;
}

.transactions .confirm-button {
  margin-top: 25px;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  background: rgb(44, 69, 180);
  border: #2942ad 1px solid;
  border-radius: 5px;
  transition: all 0.5s ease;
}

.transactions .confirm-button:hover {
  background-color: #ffffff;
  color: #2942ad;
  border: #2942ad 1px solid;
  border-radius: 5px;
}

footer {
  font-size: 12px;
  width: 100%;
  margin-top: 10px;
  text-align: right;
  color: #ffffff;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
/* transition: all 0.15s ease; */
</style>
