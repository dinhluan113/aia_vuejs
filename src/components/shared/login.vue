<template>
    <div id="lg">
        <div class="lgContainer">
            <img src="../../assets/img/logo.png" alt="logo" class="imgLogo" />
            <div class="mainContainer">
                <div class="frmGroup">
                    <i class="fa fa-user"></i>
                    <input ref="username" id="txtUserName" name="txtUserName" placeholder="Username" v-model="userName" v-on:blur="validateUsername()"/>
                </div>
                <div class="frmGroup">
                    <i class="fa fa-key"></i>
                    <input ref="password" id="txtPassword" type="password" name="txtPassword" placeholder="Password" v-model="password" v-on:blur="validatePassword()"/>
                </div>

                <a href="javascript:void(0)" v-on:click="submitLogin()" class="btnLogin">Login</a>
            </div>
        </div>
    </div>
</template>
<script>
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const UsersRepository = RepositoryFactory.get('users')
    export default {
        data(){
            return{
                userName: "",
                password: ""
            }
        },
        created(){
        },
        methods: {
            validateUsername(){
                if (this.userName === '')
                    this.$refs.username.style.borderBottom = "1px solid red";
                else
                    this.$refs.username.style.borderBottom = "1px solid #3e464d";
                return this.userName !== '';
            },
            validatePassword(){
                if (this.password === '')
                    this.$refs.password.style.borderBottom = "1px solid red";
                else
                    this.$refs.password.style.borderBottom = "1px solid #3e464d";
                return this.password !== '';
            },
            submitLogin(){
                if(!this.validateUsername())
                {
                    this.$refs.username.focus();
                    return false;
                }
                if(!this.validateUsername())
                {
                    this.$refs.password.focus();
                    return false;
                }
                if (this.validateUsername() && this.validatePassword()){
                    let promise = UsersRepository.checkExist(this.userName, this.password);
                    promise.then(function (response) {
                        // Login successed
                        if(response.data){
                            console.log("log");
                        }
                        else{
                            alert("Sai tên đăng nhập hoặc mật khẩu");
                        }
                    });
                }
            }
        },
    }
</script>

<style>
    @import "styleLogin.css";
</style>