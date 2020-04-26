<template>
  <div class="Header clearfix">
    <router-link :to="{name: 'root'}">
      <img src="../assets/cnodejs_light.svg" alt="">
    </router-link>
    <ul>
      <router-link :to="{name: 'root'}">
        <li><a href="">首页</a></li>
      </router-link>
      <li><a href="">新手入门</a></li>
      <li><a href="">API</a></li>
      <li><a href="">关于</a></li>
       <router-link :to="{name: 'registerWindow'}">
        <li><a href="">注册</a></li>
      </router-link>
      <router-link :to="{name: 'loginWindow'}">
        <li><a href="">登录</a></li>
      </router-link>
    </ul>
  </div>
  
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  * {
    margin: 0 auto;
  }
  .clearfix {
    clear: both;
    display: block;
    content:''
  }
  .Header {
    background-color: #444;
    height: 50px;
  }
  img {
    max-width: 120px;
    margin-left: 50px;
    margin-top: 10px;
  }
  a {
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
  }
  ul {
    list-style: none;
    float: right;
    margin: 4px;
  }
  ul li {
    display: inline-block;
    padding: 10px 15px;
  }
</style>