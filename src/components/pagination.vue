<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="judgement">...</button>
    <button v-for="btn of pageBtns" 
            :class="[{currentPage: btn === currentPage}, 'pageBtn']"
            @click="changeBtn(btn)"
            >
      {{ btn }}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'pagination',
  data() {
    return {
      pageBtns: [1, 2, 3, 4, 5, '...'],
      currentPage: 1,
      judgement: false
    }
  },
  methods: {
    changeBtn(btn) {
      if (typeof btn !== 'number') {
        // console.log(btn) btn为原生Event对象
        // btn.target.innerText
         switch (btn.target.innerText) {
          case '首页':
            this.pageBtns = [1, 2, 3, 4, 5, '...']
            this.changeBtn(1)
            break
          case '上一页':
            $('button.currentPage').prev().click()
            break
          case '下一页':
            $('button.currentPage').next().click()
            break
          default:
            break
        }
        // 必须 return，否则后面的方法会继续执行，会导致切换页码出现问题
        return 
      }
      this.currentPage = btn
      if (btn > 4) {
        this.judgement = true
      } else {
        this.judgement = false
      }
      if (btn === this.pageBtns[4]) {
        // 移除数组pageBtns的第一个元素
        this.pageBtns.shift()
        // 给新的数组后面添加一个元素
        this.pageBtns.splice(4, 0, this.pageBtns[3]+1)
      } else if (btn === this.pageBtns[0] && btn !== 1) {
        // 移除数组pageBtns的最后一个元素
        this.pageBtns.unshift(this.pageBtns[0]-1)
        // 给新的数组第一个元素的前面添加一个元素
        this.pageBtns.splice(5, 1)
      }
       this.$emit('renderList', this.currentPage)
    }
  }
}
</script>

<style>
button {
  color: #778087;
  padding: 4px 12px;
  line-height: 20px;
  border-radius: 2px;
  cursor: pointer;
  background: #fff;
  margin-left: 5px;
}
.currentPage {
  color:#fff;
  background-color: #2275da;
  border-radius: 2px;
}

</style>