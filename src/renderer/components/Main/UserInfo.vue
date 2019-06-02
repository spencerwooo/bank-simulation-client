<template>
<!-- <李文煜> -->
<div id="user-info">
  <img id="logo" src="@/assets/logo.png" alt="icon">
  <h1>Bank Simulator</h1>
  <h3>银行模拟器</h3>
  <div class="user-data">
    <div class="title">
      <strong>User Name:</strong> {{ userName }}
    </div>
    <div class="transaction-history">
      <strong>Transactions:</strong>
    </div>
    <ul class="transaction-history-list" v-observe-visibility="visibilityChanged">
      <li v-for="item in history" :key="item.key">
        {{ item.key }}: {{ item.type }} ${{ item.amount }}
      </li>
    </ul>
  </div>
</div>
<!-- </李文煜> -->
</template>

<script>
// <李文煜>
const Store = require('electron-store')

export default {
  data () {
    return {
      userName: null,
      history: null
    }
  },
  methods: {
    visibilityChanged: function () {
      const store = new Store()
      this.userName = store.get('username')
      this.history = store.get('history')
    }
  }
}
// </李文煜>
</script>

<style>
/* </李文煜> */
#user-info {
  text-align: center;
  font-size: 14px;
  font-style: bold;
  color: #ffffff;
}

#logo {
  width: 80px;
  height: 80px;
}

h1 {
  font-size: 24px;
}
h3 {
  font-size: 14px;
}
p {
  font-size: 14px;
}

.user-data {
  margin: 50px 10px;
  text-align: left;
}

.user-data .transaction-history{
  margin-top: 10px;
}

.transaction-history-list {
  list-style: none;
  padding: 10px 0px;
}
/* </李文煜> */
</style>
