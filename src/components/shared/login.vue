<template>
    <div id="lg">
        <div class="lgContainer">
            <img src="../../assets/img/logo.png" alt="logo" class="imgLogo" v-if="this.showValidate == false" />
            <div class="mainContainer" v-if="this.showValidate == false">

                <img v-if="this.avatar != ''" :src="this.avatar" />

                <p class="lg_title">Welcome to your app</p>

                <div class="lg_SocialGr">
                    <gSigninButton @done="onUserLoggedIn" />
                </div>
            </div>
            <div class="mainContainer" v-else>

                <img v-if="this.avatar != ''" :src="this.avatar" class="lg_avatar" />

                <p class="lg_msg">Registration email sent to <br /><strong>{{ this.userName }}</strong><br />Open this email to finish signup.</p>
                <p class="lg_msg_smaller">If you don’t see this email in your inbox within 15 minutes, look for it in your junk mail folder. If you find it there, please mark the email as “Not Junk”.</p>

            </div>
            <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>

        </div>
    </div>
</template>
<script>
    import loading from './loading.vue'
    import gSigninButton from './google_signin_button.vue'
    import { RepositoryFactory } from '../../repositories/RepositoryFactory'
    const UsersRepository = RepositoryFactory.get('users')
    export default {
        data() {
            return {
                userName: "",
                password: "",
                avatar: "",
                token: "",
                showValidate: false,
                isShowLoading: false,
                client_id: process.env.VUE_APP_CLIENT_ID
            }
        },
        components: {
            loading,
            gSigninButton
        },
        mounted() {
            if (localStorage.getItem('jwt') != null) {
                this.$emit('loggedIn')
                if (this.$route.params.nextUrl != null) {
                    this.$router.push(this.$route.params.nextUrl)
                } else {
                    this.$router.push('/', () => { });
                }
            }
        },
        methods: {
            validateUsername() {
                return this.userName !== '';
            },
            validatePassword() {
                return this.password !== '';
            },
            onUserLoggedIn(user) {
                let basicProfile = user.getBasicProfile();
                this.userName = basicProfile.getEmail();
                this.password = basicProfile.getId();
                this.token = user.getAuthResponse().id_token;
                this.avatar = basicProfile.getImageUrl();
                this.submitLogin();
                //console.log(basicProfile.getId());
                //console.log(basicProfile.getName());
                //console.log(basicProfile.getEmail());
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
                        Password: this.password,
                        token: this.token,
                        avatar: this.avatar,
                    };
                    let promise = UsersRepository.checkExist(dto);
                    promise
                        .then(function (response) {
                            if (response.data.statusCode == 200) {
                                self.showValidate = false;

                                localStorage.setItem('user', response.data.username)
                                localStorage.setItem('userss', response.data.userss)
                                localStorage.setItem('jwt', response.data.token)

                                if (localStorage.getItem('jwt') != null) {
                                    self.$emit('loggedIn')
                                    if (self.$route.params.nextUrl != null) {
                                        self.$router.push(self.$route.params.nextUrl)
                                    } else {
                                        self.$router.push('/', () => { });
                                    }
                                }
                            }
                            else if (response.data.statusCode == 401) {
                                self.showValidate = true;
                            }
                            else {
                                alert("Sai tên đăng nhập hoặc mật khẩu");
                            }
                            return response;
                        })
                        .catch(function (e) {
                            alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                            console.log(e);
                        })
                        .finally(function () {
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