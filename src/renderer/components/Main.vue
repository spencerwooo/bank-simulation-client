<template>
  <div id="wrapper">
    <div class="top-bar">
      <button class="refresh-button" v-on:click="refresh"/>
      <span>{{ userName }}</span>
      <img class="avatar" v-if="showMenu" key="on" @click="showMenu = false" src="~@/assets/close.png" alt="avatar">
      <img class="avatar" v-else key="off" @click="showMenu = true" src="~@/assets/account.png" alt="avatar">
      <transition name="dropdown">
      <div class="top-menu" v-bind:class="{ active: showMenu }" v-if="showMenu">
        <ul class="top-menu-list">
          <li>
            <button class="account" @click="showAccountInfo">Account</button>
          </li>
          <li>
            <button class="logOut" @click="logOut">Log out</button>
          </li>
        </ul>
      </div>
      </transition>
    </div>
    <main>
      <!-- <system-information></system-information> -->
      <div class="title">总余额</div>
      <div class="savings">
        <div class="total">{{ balance }}</div>
        <div class="indicator" :style="{ backgroundColor: indicatorColor }">
          <img class="arrow" v-bind:src="arrowpng" alt="Increase">
          <span class="percentage">{{ percentage }}</span>
        </div>
      </div>
      <div class="transactions">
        <div class="transaction-type">
          <div class="item-title">Transaction type</div>
          <div class="item-description">你要办理哪种业务？</div>
          <v-select v-model="type" :options="['存款', '取款', '转账']"></v-select>
        </div>
        <div class="transaction-amount">
          <div class="item-title">Transaction amount</div>
          <div class="item-description">本次需要交易多少金额？</div>
          <input class="amount" v-model="amount" placeholder="100">
        </div>
        <button class="confirm-button" v-on:click="submit">Confirm</button>
      </div>
    </main>
    <footer>Team Offline Flower! Made with love ©2019</footer>
  </div>
</template>

<script>
import SystemInformation from './Main/SystemInformation'

export default {
  name: 'landing-page',
  components: { SystemInformation },
  data () {
    return {
      showMenu: false,
      userName: 'Bank Simulator',
      balance: 'Balance',
      percentage: 'Percent %',
      type: '',
      amount: '',
      indicatorColor: '#19A553',
      arrowpng: require('../assets/up.png')
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    submit: function () {
      alert(this.type + this.amount)
    },
    refresh: function () {
      this.percentage = Math.floor(Math.random() * Math.floor(100))
      if (this.percentage > 50) {
        this.percentage = -this.percentage
      } else {
        console.log(this.percentage)
      }

      if (this.percentage >= 0) {
        this.indicatorColor = '#19A553'
        this.arrowpng = require('../assets/up.png')
      } else {
        this.indicatorColor = '#E04E36'
        this.arrowpng = require('../assets/down.png')
      }
      this.percentage = this.percentage.toString() + '%'
    },
    showAccountInfo: function () {
      alert('风一样的勇士')
    },
    logOut: function () {
      alert('Logging out...')
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
@import url("https://fonts.googleapis.com/css?family=Maven+Pro:400,700");
@import "./../../../node_modules/vue-select/dist/vue-select.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Maven Pro", "Source Sans Pro", "Microsoft YaHei", sans-serif;
  font-size: 14px;
  color: #2c3e50;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgb(23, 50, 170) 50%,
    rgb(140, 25, 207) 100%
  );
  height: 100vh;
  padding: 20px;
  width: 100vw;
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
  -webkit-app-region: drag;
}

.top-bar .avatar {
  border-radius: 100px;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-bottom: 3px;
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
  font-size: 14px;
  margin-top: 120px;
}

.savings {
  color: #2c3e50;
  margin-bottom: 6px;
  vertical-align: middle;
}

.savings .total {
  font-size: 42px;
  float: left;
  /* display: inline-block; */
}

.savings .indicator {
  margin-left: 15px;
  margin-top: 13px;
  float: left;
  padding: 5px;
  border-radius: 5px;
}

.indicator .arrow {
  height: 10px;
  width: auto;
}

.indicator .percentage {
  color: #ffffff;
}

.transactions {
  margin-top: 180px;
}

.transactions .item-title {
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 18px;
}

.transactions .item-description {
  margin-bottom: 10px;
  font-size: 14px;
  color: #a0a0a0;
}

.transactions .amount {
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
  /* border: 1px solid #2942ad; */
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 5px;
  color: grey;
}

.transactions .amount:focus {
  outline: 1px solid #2942ad;
}

.transactions .confirm-button {
  margin-top: 36px;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background: rgb(44, 69, 180);
  border: #2942ad 1px solid;
  border-radius: 5px;
  transition: all 0.5s ease;
  -webkit-app-region: no-drag;
}

.transactions .confirm-button:hover {
  background-color: #ffffff;
  color: #2942ad;
  border: #2942ad 1px solid;
  border-radius: 5px;
}

.refresh-button {
  width: 12px;
  height: 12px;
  margin-right: 5px;
  margin-bottom: 3px;
  vertical-align: middle;
  background-color: Transparent;
  background-image: url("../assets/refresh.png");
  background-size: contain;
  border: none;
  cursor: pointer;
  overflow: hidden;
  -webkit-app-region: no-drag;
}

.refresh-button:hover {
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}

footer {
  font-size: 12px;
  width: 100%;
  margin-top: 10px;
  text-align: right;
  color: #ffffff;
}

.vs__dropdown-option--highlight {
  background: #2E49B1 !important;
}

.top-menu {
  background-color: #ffffff;
  border-radius: 5px;
  position: fixed;
  margin-top: 60px;
  margin-right: 20px;
  box-shadow: 0px 1px 20px 2px rgba(140, 25, 207, 0.5);
  right: 0;
  top: 0;
}

.top-menu .top-menu-list {
  list-style: none;
  text-align: center;
}

.top-menu .top-menu-list button {
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  background-color: transparent;
  border: none;
  color: rgb(140, 25, 207);
  cursor: pointer;
}

.top-menu .top-menu-list button:hover {
  background-color: rgb(140, 25, 207);
  color: #ffffff;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.5s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
