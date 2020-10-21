<template>
  <div class="userInfo">
    <!-- 如果正在加载显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div class="userInfos" v-else>
      <div class="mainPage topBar">
        <router-link :to="{
          name: 'root'
        }">
          <span>主页</span>
        </router-link>
      </div>
      <section>
        <img :src="user_info.avatar_url" alt="userName">
        <span>{{user_info.loginname}}</span>
        <p>{{ user_info.score }}积分</p>
        <p>注册时间: {{ user_info.create_at | dateForm }}</p>
      </section>
    </div>
    <div class="replies">
      <p class="topBar">最近回复的主题</p>
      <ul>
        <li v-for="item of user_info.recent_replies">
          <router-link :to="{
            name: 'post_content',
            params: {
              id: item.id
            }
          }">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
    <div class="myTopics">
      <p class="topBar">最近创建的主题</p>
      <ul>
        <li v-for="item of user_info.recent_topics">
          <router-link :to="{
            name: 'post_content',
            params: {
              id: item.id
            }
          }">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data() {
    return {
      isLoading: false,
      user_info: {}
    }
  },
  methods: {
     getUserData() {
      this.$http.get(`https://52.197.183.123/api/v1/user/${this.$route.params.name}`)
                .then(res => {
                  if(res.data.success === true) {
                    this.isLoading = false
                    this.user_info = res.data.data
                  }
                })
                .catch(function(error) {
                  console.log(error)
                }) 
    }
  },
  beforeMount() {
    this.isLoading = true
    this.getUserData()
  }
}
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  .userInfos {
    margin-top: 18px;
  }
  .userInfos, .replies, .myTopics {
    margin-bottom: 13px;
  }
  .userInfos section {
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    border-radius: 0 0 3px 3px;
    padding: 10px;
    color: #778087;
  }
  .userInfos section img, .userInfos section span {
    vertical-align: middle;
  }
  .userInfos section p {
    padding: 5px 0;
    font-size: 14px;
  }
 .replies ul > li, .myTopics ul > li {
  list-style: none;
  background-color: #fff;
  padding: 10px;
  color: #733a84;
  border-bottom: 1px solid #f0f0f0;
}
.replies ul > li:last-child, .myTopics ul > li:last-child {
  border-radius: 0 0 3px 3px;
}
.userInfo .mainPage {
  color: #80bd01;
}
.userInfo .topBar {
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 3px 3px 0 0;
  font-size: 14px;
}
.userInfos section img {
  width: 48px;
  height: 48px;
}

</style>