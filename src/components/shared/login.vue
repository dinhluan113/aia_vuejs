<template>
    <div id="lg">
        <div class="lgContainer">
            <img src="../../assets/img/logo.png" alt="logo" class="imgLogo" />
            <div class="mainContainer">
                <div class="frmGroup">
                    <i class="fa fa-user"></i>
                    <input ref="username" id="txtUserName" name="txtUserName" placeholder="Username" v-model="userName" v-on:blur="validateUsername()" v-on:keyup.enter="submitLogin()"/>
                </div>
                <div class="frmGroup">
                    <i class="fa fa-key"></i>
                    <input ref="password" id="txtPassword" type="password" name="txtPassword" placeholder="Password" v-model="password" v-on:blur="validatePassword()" v-on:keyup.enter="submitLogin()"/>
                </div>
                <a href="javascript:void(0)" v-on:click="submitLogin()" class="btnLogin">Login</a>
                <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
                </div>
        </div>
    </div>
</template>
<script>
import loading from './loading.vue'
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const UsersRepository = RepositoryFactory.get('users')
export default {
    data() {
        return {
            userName: "",
            password: "",
            isShowLoading: false
        }
    },
    components: {
        loading
    },
    created() {},
    methods: {
        validateUsername() {
            if (this.userName === '')
                this.$refs.username.style.borderBottom = "1px solid red";
            else
                this.$refs.username.style.borderBottom = "1px solid #3e464d";
            return this.userName !== '';
        },
        validatePassword() {
            if (this.password === '')
                this.$refs.password.style.borderBottom = "1px solid red";
            else
                this.$refs.password.style.borderBottom = "1px solid #3e464d";
            return this.password !== '';
        },
        submitLogin() {
            if (!this.validateUsername()) {
                this.$refs.username.focus();
                return false;
            }
            if (!this.validateUsername()) {
                this.$refs.password.focus();
                return false;
            }
            if (this.validateUsername() && this.validatePassword()) {
                this.isShowLoading = true;
                let self = this;
                let dto = {
                    UserName: this.userName,
                    Password: this.password
                };
                let promise = UsersRepository.checkExist(dto);
                promise
                    .then(function(response) {
                        if (response.data.statusCode != 404) {
                            localStorage.setItem('user', response.data.username)
                            localStorage.setItem('userss', response.data.userss)
                            localStorage.setItem('jwt', response.data.token)

                            if (localStorage.getItem('jwt') != null) {
                                self.$emit('loggedIn')
                                if (self.$route.params.nextUrl != null) {
                                    self.$router.push(this.$route.params.nextUrl)
                                } else {
                                    self.$router.push('/', () => {});
                                }
                            }
                        } else {
                            alert("Sai tên đăng nhập hoặc mật khẩu");
                        }
                        return response;
                    })
                    .catch(function(e) {
                        alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                        console.log(e);
                    })
                    .finally(function() {
                        self.isShowLoading = false;
                    });
            }
        }
    },
}
</script>

<style>
@import "styleLogin.css";
</style>