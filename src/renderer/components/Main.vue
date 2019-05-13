<template>
  <div id="wrapper">
    <div class="top-bar">
      <button class="refresh-button" v-on:click="refresh"/>
      <span>{{ username }}</span>
      <img
        class="avatar"
        v-if="showMenu"
        key="on"
        @click="showMenu = false"
        src="~@/assets/close.png"
        alt="avatar"
      >
      <img
        class="avatar"
        v-else
        key="off"
        @click="showMenu = true"
        src="~@/assets/account.png"
        alt="avatar"
      >
      <transition name="dropdown">
        <div class="top-menu" v-bind:class="{ active: showMenu }" v-if="showMenu">
          <ul class="top-menu-list">
            <li>
              <button class="account" @click="showAccountPanel">Account</button>
            </li>
            <li>
              <button class="logOut" @click="logOut">Log out</button>
            </li>
          </ul>
        </div>
      </transition>
      <vue-modaltor
        :visible="showAccountInfo"
        :animation-panel="'modal-slide-bottom'"
        :bg-overlay="'rgba(255, 255, 255, 0.9)'"
        :bg-panel="'rgb(23, 50, 170)'"
        @hide="hideAccountPanel"
      >
        <template slot="close-icon">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="20"
            height="20"
            xml:space="preserve"
          >
            <path
              class="st0"
              fill="#ffffff"
              d="M8.7,7.6c-0.4-0.4-1-0.4-1.4,0C6.9,8,6.9,8.6,7.3,9l11,11l-11,11c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0 l11-11l11,11c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4l-11-11L32,9c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-11,11L8.7,7.6z"
            ></path>
          </svg>
        </template>
        <UserInfo/>
      </vue-modaltor>
    </div>
    <main>
      <vue-element-loading :active="loading" >
        <img src="~@/assets/loading.svg" alt="loading" width="120px" height="120px">
      </vue-element-loading>
      <div class="title">总余额</div>
      <div class="savings">
        <div class="total">${{ balance }}</div>
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
          <input class="amount" v-model="amount">
        </div>
        <button class="confirm-button" v-on:click="submit">Confirm</button>
      </div>
    </main>
    <footer>Team Offline Flower! Made with love ©2019</footer>
  </div>
</template>

<script>
import UserInfo from './Main/UserInfo'
const Store = require('electron-store')

let requestUrl = 'http://bk.felinae98.cn:8001/'

export default {
  name: 'landing-page',
  components: { UserInfo },
  data () {
    return {
      // 显示菜单
      showMenu: false,
      showAccountInfo: false,
      // 等待过渡动画加载
      loading: false,

      // 数据
      username: null,
      password: null,
      balance: 'Balance',
      balanceData: 0,
      percentage: '0.0%',
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

    poll (fn, timeout, interval) {
      var endTime = Number(new Date()) + (timeout || 2000)
      interval = interval || 100

      var checkCondition = function (resolve, reject) {
        var ajax = fn()

        ajax.then(function (response) {
          console.log(response.data)

          if (response.data === 'TransactionDone') {
            resolve(response.data)
          } else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject)
          } else {
            reject(new Error('Timed out!'))
          }
        })
      }

      return new Promise(checkCondition)
    },

    submit: function () {
      if (this.type === '转账') {
        alert('This feature is not yet implemented.')
      } else {
        this.loading = true

        if (this.type === '存款') {
          this.type = 'deposit'
        } else if (this.type === '取款') {
          // 傻屌唐大佬非得用名词，透，干他🐴的
          this.type = 'withdrawal'
        }

        let submitData = {
          'transactionType': 'general',
          'account': {
            'username': this.username,
            'password': this.password
          },
          'transactions': {
            'type': this.type,
            'amount': this.amount
          }
        }

        console.log(submitData)

        // 第一步：排个队
        this.$http({
          method: 'post',
          url: requestUrl + 'queue',
          headers: {
            'Content-Type': 'application/json'
          },
          data: submitData
        })
          .then(response => {
            let token = response.data
            console.log(token)

            let timeout = 10 * 1000
            let interval = 1 * 1000

            // 第二步：开始轮询结果，直到 status 为 TransactionDone
            this.poll(() => {
              return this.$http.get(requestUrl + 'status', {
                params: {
                  session: token
                }
              })
            }, timeout, interval).then(response => {
              // 第三步：得到 result
              this.$http.get(requestUrl + 'result', {
                params: {
                  session: token
                }
              })
                .then(response => {
                  console.log(response.data)

                  // 将交易结果存一个 history 吧！
                  const store = new Store()
                  let history = store.get('history')

                  let len = 0
                  try {
                    if (history === null) {
                      len = 0
                    } else {
                      len = history.length
                    }
                  } catch (error) {
                    len = 0
                    console.log(error)
                  }

                  let storageData = {
                    key: len + 1,
                    type: submitData['transactions']['type'],
                    amount: submitData['transactions']['amount']
                  }

                  if (history) {
                    store.set('history', history.concat(storageData))
                  } else {
                    store.set('history', [storageData])
                  }

                  console.log(store.get('history'))

                  // 手动 Refresh，因为唐大佬说 query 才返回正确的 balance
                  this.refresh()
                })
                .catch(err => {
                  alert(err)
                  this.loading = false
                })
            }).catch(err => {
              console.log(err)
              alert(err)
              this.loading = false
            })
          })
      }

      this.type = null
      this.amount = null
    },

    refresh: function () {
      this.loading = true

      let queryData = {
        'transactionType': 'general',
        'account': {
          'username': this.username,
          'password': this.password
        },
        'transactions': {
          'type': 'query'
        }
      }

      this.$http({
        method: 'post',
        url: requestUrl + 'queue',
        headers: {
          'Content-Type': 'application/json'
        },
        data: queryData
      })
        .then(response => {
          let token = response.data
          console.log(token)

          let timeout = 10 * 1000
          let interval = 1 * 1000

          this.poll(() => {
            return this.$http.get(requestUrl + 'status', {
              params: {
                session: token
              }
            })
          }, timeout, interval).then(response => {
            this.$http.get(requestUrl + 'result', {
              params: {
                session: token
              }
            })
              .then(response => {
                console.log(response.data)

                let balance = response.data.balance
                if (this.balance === 'Balance') {
                  this.percentage = '0.0'
                } else {
                  this.percentage = (
                    ((balance - this.balanceData) / balance) *
                  100
                  ).toFixed(2)
                }
                this.balanceData = balance
                this.balance = this.balanceData
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

                if (this.percentage >= 0 || this.percentage === '0.0') {
                  this.indicatorColor = '#19A553'
                  this.arrowpng = require('../assets/up.png')
                } else {
                  this.indicatorColor = '#E04E36'
                  this.arrowpng = require('../assets/down.png')
                }
                this.percentage = this.percentage.toString() + '%'

                this.loading = false
              })
              .catch(err => {
                alert(err)
                this.loading = false
              })
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        })
    },

    showAccountPanel: function () {
      this.showAccountInfo = true
      this.showMenu = false
    },
    hideAccountPanel: function () {
      this.showAccountInfo = false
    },
    logOut: function () {
      this.showMenu = false
      alert('Logging out...')
    }
  },
  mounted () {
    const store = new Store()

    store.set('username', 'Garvey')
    store.set('password', 'GarveyPassword')

    // 转账历史不删了
    // store.set('history', '')

    this.username = store.get('username')
    this.password = store.get('password')

    this.refresh()
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
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
  background: #2e49b1 !important;
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
  z-index: 5000;
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
  transition: all 0.2s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
