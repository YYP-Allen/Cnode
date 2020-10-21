<template>
  <div>
    <!-- 数据未完全返回的时候，显示加载中 -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <!-- 主题列表 -->
    <div>
      <ul>
        <li>
          <div class="topbar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="post of posts" class="listInfo">
          <img :src="post.author.avatar_url" alt="">
          <span class="reply_visit">
            <!-- 浏览量、回复量 -->
            <span class="replay_count">{{ post.reply_count }}</span>/<span>{{ post.visit_count }}</span>
          </span>
          <span :class="[{put_good:(post.good === true), put_top:(post.top === true), others_mark:(post.good !== true && post.top !== true)}]">
            {{ post | tabForm}}
          </span>
          <router-link :to="{
            name:'post_content',
            params: {
              id: post.id,
              name: post.author.loginname
            }
          }">
            <span class="title">
            <!-- 标题 -->
              {{ post.title }}
            </span>
          </router-link>
          <span class="last_replay">
            <!-- 最后回复时间 -->
            {{ post.last_reply_at | dateForm}}
          </span>
        </li>
        <li>
          <!-- 分页组件 -->
          <pagination @renderList="deliverPage"></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from './pagination'
export default {
  name: "postList",
  data() {
    return {
      isLoading: false,
      posts: [],
      postPage: 1
    }
  },
  components: {
    // 注册分页组件 
    pagination
  },
  methods: {
    getData() {
      this.$http.get('https://52.197.183.123/api/v1/topics',{
        params: {
          page: this.postPage,
          limit: 18
        }
      }).then(
        res => {
          // 加载成功，去除加载动画
          this.isLoading = false
          console.log(res)
          this.posts = res.data.data
        }
      )
        .catch(function(error) {
            console.log(error)
        })
    },
    deliverPage(value) {
      this.postPage = +value
      this.getData()
    }
  },
  beforeMount() {
    // 在页面页面加载成功之前加载动画，获取数据
    this.isLoading = true
    this.getData()
  }
}
</script>

<style scoped>
  ul li{
    background-color: #fff;
    list-style: none;
    padding: 10px;
  }
  ul li:first-child {
    background: #f6f6f6;
    border-radius: 3px;
  } 
  .topbar > span {
    display: inline-block;
    margin: 0 10px;
    padding: 3px 4px;
  }
  ul li:not(.topbar) {
    border-bottom: 1px solid #f0f0f0;
    color: #333;
  }
  ul li span {
    display: inline-block;
    vertical-align: middle;
  }
  ul li:last-child {
    border-top: 0;
  }
  ul li:not(.topbar):hover {
    background-color: #f6f6f6;
  }
  .listInfo img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
    border-radius: 2px;
  }
.put_top, .put_good {
    background-color: #80bd01;
    color: #fff;
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 3px;
    margin-right: 10px;
  }
.others_mark {
  background-color: #e5e5e5;
  color: #999;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
  margin-right: 10px;
}
.title {
  color: #333;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
.title:hover {
  text-decoration: underline;
  color: #333
}
.listInfo {
  position: relative;
}
span.last_replay {
  min-width: 50px;
  font-size: 12px;
  color: #778087;
  text-align: right;
  position: absolute;
  left: calc(100% - 60px);
}
.reply_visit {
  width: 70px;
  font-size: 12px;
  text-align: center;
}
.reply_visit .replay_count {
  color: #501F79;
}
</style>
