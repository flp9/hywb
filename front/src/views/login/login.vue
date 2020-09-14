<template>
  <div class="login-bg">
    <header class="head-box">
      <img class="logo" src="../../assets/img/hywb_logo.png" alt="华友文保"> 文化遗址安全防护一体化智慧平台
    </header>
    <div class="login-box">
      <el-form
        :model="ruleForm"
        status-icon
        class="login-form-box"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
      >
        <el-form-item prop="username">
          <el-input size="large" prefix-icon="el-icon-user" 
                    v-model.number="ruleForm.username" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" prefix-icon="el-icon-lock" type="password"
                    v-model="ruleForm.password" placeholder="请输入用户名" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import cookie from 'js-cookie'
import { loginApi, getMenuList } from '../../request/login'

export default {
  components: {},
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "123456",
        username: "admin"
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm(formName) {
        this.$router.push('/welcome')
      // const self = this;
      //   self.$router.push('/welcome')
      // let result = loginApi(self.ruleForm);
      // result.then(res => {
      //   if(res.data.resultCode===200) {
      //     let millisecond = new Date().getTime();
      //     let expiresTime = new Date(millisecond + Number(res.data.data.expiration)*1000);
      //     let time = {
      //       expires: expiresTime,
      //     }
      //     cookie.set("username", self.ruleForm.username, time);
      //     cookie.set("token", res.data.data.tokenHead + res.data.data.token, time)
      //     self.queryMenuList(res.data.data.userId);
      //     self.$router.push('/welcome')
      //   }
      // })
    },
    queryMenuList(userId) {
      let self = this;
      let result = getMenuList(userId);
      result.then(res => {
        if(res.data.resultCode===200) {
          localStorage.setItem('sysMenuList', JSON.stringify(res.data.data.sysMenuList));
          localStorage.setItem('userMenuList', JSON.stringify(res.data.data.userMenuList));
          // self.$store.dispatch('Get_sysmenulist', res.data.data.sysMenuList);
          // self.$store.dispatch('Get_usermenulist', res.data.data.userMenuList);
        }
      })
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
