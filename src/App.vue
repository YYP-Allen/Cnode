<template>
  <div id="app">
    <Header></Header>
    <main>
      <router-view name="main"></router-view>
      <router-view name="slidebar"></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/Header'
import postList from './components/postList'
export default {
  name: 'App',
  components: {
    Header,
    postList
  }
}
</script>

<style>
  body {
    margin: 0;
    background: #e1e1e1;
  }
  main {
    position: relative;
    height: 100%;
    width: 80%;
    margin: 0 auto;
  }
</style>
