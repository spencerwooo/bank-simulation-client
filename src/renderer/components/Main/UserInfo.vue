<template>
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
    <ul class="transaction-history-list">
      <li>$100</li>
      <li>$-20</li>
      <li>$10</li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      userName: '风一样的勇士'
    }
  }
}
</script>


<style>
#user-info {
  text-align: center;
  font-size: 14px;
  font-style: bold;
  color: #ffffff;
}

#logo {
  width: 40px;
  height: 40px;
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
</style>
