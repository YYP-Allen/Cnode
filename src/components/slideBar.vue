<template>
  <div class="moreInfo">
    <div class="authorSummary">
      <div class="topBar">作者</div>
      <div class="userInfo">
        <router-link :to="{
          name: 'user_info',
          params: {
            name: user_info.loginname
          }
        }">
          <img :src="user_info.avatar_url" alt="name">
        </router-link>
        <span>{{ user_info.loginname }}</span>
      </div>
      <p class="score">积分: {{ user_info.score }}</p>
    </div>
    <div class="recent_topics">
      <div class="topBar">作者最近的主题</div>
      <ul>
        <li v-for="list of limitTopics_5">
          <router-link :to="{
            name: 'post_content',
            params: {
              id: list.id,
              name: list.author.loginname
            }
          }">
            {{ list.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topBar">作者最近回复</div>
      <ul>
        <li v-for="list of limitReplys_5" class="recentTitle">
          <router-link :to="{
            name: 'post_content',
            params: {
              id: list.id,
              name: list.author.loginname
            }
          }">
            {{ list.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slideBar',
  data() {
    return {
      user_info: {}
    }
  },
  methods: {
    getData() {
      // 点击列表项内容的Article组件 title时，通过定义的路由已经获取了name的值
      // 已经获取所以 .then() 不需要 if(res.data.success === true)判断
      this.$http.get(`https://52.197.183.123/api/v1/user/${this.$route.params.name}`)
                .then(res => {
                    this.isLoading = false
                    this.user_info = res.data.data
                })
                .catch(function(error) {
                  // 获取数据失败
                  console.log(error)
                }) 
    }
  },
  computed: {
    // 限制显示最近的 topic 最多为五条
    limitTopics_5() {
      if(this.user_info.recent_topics) {
        return this.user_info.recent_topics.slice(0, 5)
      }
    },
    limitReplys_5() {
    // 限制显示最近的 reply 最多为五条
      if(this.user_info.recent_replies) {
        return this.user_info.recent_replies.slice(0, 5)
      }
    }
  },
  beforeMount() {
    this.isLoading = true
    this.getData()
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: #778087;
}
.moreInfo {
  float: right;
  width: 290px;
  position: absolute;
  left: 76%;
  top: 0;
  margin-right: -5%;
}
.moreInfo .score {
  font-size: 14px;
  color: #444;
  padding-left: 10px; 
}
.authorSummary img {
  width: 48px;
  height: 48px;
}
.topBar {
  color: #444;
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 3px 3px 0 0;
  font-size: 14px;
}
.authorSummary, .recent_topics, .recent_replies{
  background-color: #fff;
  margin-bottom: 13px;
  border-radius: 3px;
}
.moreInfo ul > li {
  list-style-type: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: -30px;
  padding-bottom: 10px;
}
.userInfo {
  padding: 10px;
}
.userInfo img {
  vertical-align: middle;
}
.userInfo span {
  vertical-align: middle;
}
</style>