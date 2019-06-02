<template>
<!-- <李文煜> -->
  <div id="login">
      <img id="logo" src="@/assets/logo.png" alt="icon">
    <h1>Bank Simulator</h1>
    <h3>银行模拟器</h3>

    <div class="login-module">
      <div class="item-title">用户名</div>
      <input class="login-username" v-model="username">
      <div class="item-title">密码</div>
      <input class="login-password" v-model="password">
      <div>
        <button class="confirm-button" v-on:click="login">登录</button>
      </div>
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
      username: null,
      password: null
    }
  },
  methods: {
    login: function () {
      const store = new Store()
      this.userName = store.set('username', this.username)
      this.history = store.set('password', this.password)

      this.$emit('startLogin', 'true')
    }
  }
}
// </李文煜>
</script>

<style scoped>
/* <李文煜> */
h1 {
  font-size: 24px;
}
h3 {
  font-size: 14px;
}
p {
  font-size: 14px;
}

input {
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
  /* border: 1px solid #2942ad; */
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 5px;
  color: grey;
}

button {
  margin-top: 36px;
  width: 100%;
  padding: 10px;
  font-family: 'Noto Sans CJK', 'Sarasa Gothic SC', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background: #FDAA2A;
  border: #2942ad 1px solid;
  border-radius: 5px;
  transition: all 0.5s ease;
  -webkit-app-region: no-drag;
}

button:hover {
  background-color: #ffffff;
  color: #FDAA2A;
  border: #FDAA2A 1px solid;
  border-radius: 5px;
}

.login-module {
  text-align: left;
  margin-top: 50px;
}

.login-module .item-title {
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 14px;
}
/* </李文煜> */
</style>
