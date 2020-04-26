<template>
   <section>
    <div class="flip_window registerbar" @click="switchWindow">
        <div class="login clearfix">
            <div class="switchbar">
              <a href="#" class="tab_login">登入</a>
              <a href="#" class="tab_register">注册</a>
            </div>
            <div class="content">
              <div class="error_hint"></div>
              <form action="" method="POST" style="position: relative">
                <div class="input_ct">
                  <i class="fa fa-user-circle"></i>              
                  <input type="text" placeholder="用户名" name="username">
                </div>
                <div class="input_ct">
                  <i class="fa fa-lock"></i>
                  <input type="password" placeholder="密码" name="password">
                </div>
                <div>
                  <input type="submit" value="登录" name="submit" @click="loginPost">
                </div>
              </form>
            </div>
        </div>
        <div class="register clearfix">
            <div class="switchbar">
              <a href="#" class="tab_login">登入</a>
              <a href="#" class="tab_register">注册</a>
            </div>
            <div class="content">
              <div class="error_hint"></div>
              <form action="" method="POST">
                <div class="input_ct">
                  <i class="fa fa-user-circle"></i>              
                  <input type="text" placeholder="用户名" name="username">
                </div>
                <div class="input_ct">
                  <i class="fa fa-lock"></i>
                  <input type="password" placeholder="密码" name="password">
                </div>
                <div class="input_ct">
                  <i class="fa fa-lock"></i>
                  <input type="password" placeholder="确认密码" name="password_confirm">
                  </div>
                <div>
                  <input type="submit" value="注册" @click="registerPost">
                </div>
              </form>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
export default {
   name: 'register',
   methods: {
     switchWindow() {
       $('.flip_window').on('click', function(e){
          e.stopPropagation()
          if (e.target.classList.contains('tab_register')) {
            $('.flip_window').removeClass('loginbar')
            $('.flip_window').addClass('registerbar')
          }
          if (e.target.classList.contains('tab_login')) {
            $('.flip_window').removeClass('registerbar')
            $('.flip_window').addClass('loginbar')
          }
          console.log(e)
          console.log(e.target)
          console.log(this)
      })
     },
     loginPost() {
       $('.login form').on('submit',function(e){
          e.preventDefault()
          if(!/^\w{3,8}$/.test($('.login input[name=username]').value)) {
            $('.login .error_hint').text('用户名需输入3-8个字符，包括字母数字和下划线')
            return false
          }
          if(!/^\w{6,10}$/.test($('.login input[name=password]').value)) {
            $('.login .error_hint').text('密码需输入6-10个字符，包括字母数字和下划线')
            return false
          }
          this.submit()
    })

     }, 
     registerPost() {
       $('.register form').on('submit',function(e){
          e.preventDefault()
          if (!/^\w{3,8}$/.test($('.register input[name=username]').value)) {
            $('.register .error_hint').text('用户名需输入3-8个字符，包括字母数字和下划线')
            return false
          }
          if (!/^\w{6,10}$/.test($('.register input[name=password]').value)) {
            $('.register .error_hint').text('密码需输入6-10个字符，包括字母数字和下划线')
            return false
          }
          if ($('.register input[name=password_confirm]').value !== $('.register input[name=password]').value) {
            $('.register .error_hint').text('两次输入的密码不一致，请再次输入')
            return false
          }
          this.submit()
        })
     }
   }
}
</script>

<style scoped>
  /* css reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
}
a {
  text-decoration: none;
}
.clearfix::after {
  content:'';
  display: block;
  clear: both;
}
.flip_window {
  display: block;/* 把整个窗口隐藏起来 */
}
input[type=submit] {
  border: none;
  padding: 7px 10px;
  box-shadow: 0 1px 1px 1px rgba(0,0,0,0.3);
}
section div.switchbar {
  display: flex;
  justify-content: center;
}
section .switchbar a {
  margin: 0 10px;
  color: #666;
  font-size: 18px;
}
.login .switchbar a:first-child,
.register .switchbar a:nth-child(2){
  border-bottom: 2px solid #444;
}
section .login,
section .register {
  padding: 16px;
}
section .login .content,
section .register .content {
  padding: 20px 40px;
}
section .login input[type=password],
section .login input[type=text],
section .register input[type=password],
section .register input[type=text]{
  width: 100%;
  padding: 10px 10px 10px 30px;
}
section .content .fa {
  position: absolute;
  left: 10px;
  top: 13px;
}
section .content .input_ct {
  position: relative;
}
section .content div {
  margin-top: 10px;
}
section .content .error_hint {
  font-size: 12px;
  color: #ff9800;
}
.login,.register {
  width:400px;
  position: absolute;
  left:50%;
  margin-top: 30%;
  box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.2);
}
.flip_window.loginbar div.login,
.flip_window.registerbar div.register {
  transform:translate(-50%,-50%) rotateY(0deg);
  backface-visibility:hidden;
  transition: all 1s;
}
.flip_window.loginbar div.register,
.flip_window.registerbar div.login {
  transform:translate(-50%,-50%) rotateY(180deg);
  backface-visibility:hidden;
  transition: all 1s;
}
</style>