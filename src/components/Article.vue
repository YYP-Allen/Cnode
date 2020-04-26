<template>
  <div class="article">
    <!-- 如果正在加载显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div v-else>
      <div class="content">
        <h2 class="content_title">{{ post.title }}</h2>
        <ul class="content_change">
          <li>·发布于 {{ post.create_at | dateForm}}</li>
          <li>·作者 {{ post.author.loginname}}</li>
          <li>.{{post.visit_count}}次浏览</li>
          <li>·来自 {{post | tabForm}}</li>
        </ul>
        <div v-html="post.content" class="discussTopic"></div>
      </div>
      <div class="replyList">
        <div class="topbar">回复</div>
        <div v-for="(reply, index) in post.replies" class="list">
          <div class="listBox">
            <router-link :to="{
            name: 'user_info',
            params: {
              name: reply.author.loginname
            }
          }">
            <img :src="reply.author.avatar_url" alt="">
            </router-link>
            <div class="listInfo">
              <router-link :to="{
              name: 'user_info',
              params: {
                name: reply.author.loginname
              }
            }">
              <span class="replyName">{{ reply.author.loginname }}</span>
              </router-link>
              <span class="floorNumber">{{ ++index}}楼</span>
            </div>
            <span v-if="reply.ups.length>0" class="thumbUp">
              👍{{reply.ups.length}}
            </span> 
          </div>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: false,
      // 当前文章页的所有内容
      post: {}
    }
  },
  // 获取列表的详情文章
  methods:{
    getArticleData() {
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                .then(res => {
                  if(res.data.success === true) {
                    this.isLoading = false
                    this.post = res.data.data
                  }
                })
                .catch(function(error) {
                  console.log(error)
                }) 
    }
  },
  beforeMount() {
    this.isLoading = true
    this.getArticleData()
  },
  // 检测路由的变化，从而对路由的变化做出响应
  watch: {
    '$route'(to, from) {
      this.isLoading = true
      this.getArticleData()
    }
  }
}
</script>

<style scoped>
/* markdown 的语法 */
@import url('../assets/markdown-github.css');
/* * {
  background-color: #fff;
} */
.article {
  max-width: 80%;
  margin-left: -5%;
}
.replyList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
    border-radius: 2px;
  }
.content h2 {
  padding: 10px 0 0 10px;
}
.content .content_change {
  display: flex;
  list-style: none;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -15px;
  padding: 15px 0 15px 10px;
}
.content .content_change > li {
  margin-right: 3px;
  font-size: 12px;
  color: #838383;
}
.discussTopic {
  padding: 0 10px 10px 10px;
  margin-bottom: 15px;
}

.replyList > div {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px;
}
.replyList p {
  font-size: 14px;
  line-height: 2em;
  padding-left: 50px;
  margin-top: -18px;
}
.listInfo {
  display: inline-block;
  margin-left: 12px;
}
.replyName {
  font-weight: bold;
}
 .topbar {
   background-color: #f6f6f6;
   padding: 8px 5px;
   border-radius: 4px;
 }
 .floorNumber {
   font-size: 12px;
   color: #08c;
 }
 .thumbUp {
   color: grey;
 }
 .listBox {
   display: flex;
 }
 .listBox > .thumbUp {
   margin-left: auto;
   margin-right: 10px;
 }
 .content, .replyList {
  background: #fff;
  border-radius: 4px;
}
a {
  font-size: 12px;
  color: #666;
  text-decoration: none;
 }
 a:hover {
   color: #564098;
 }
</style>