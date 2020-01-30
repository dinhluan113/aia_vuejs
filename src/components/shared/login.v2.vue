<template>
    <div id="lg">
        <div class="lgContainer">
            <div class="mainContainer" v-if="this.showValidate == false">
                <div>
                    <div>
                        <p style="font-size: 2em">Your Contracts.<span style="color: #11bbb5;font-size: 1em"> Greener.</span></p>
                        <p style="font-size: 0.9em; color: #666">Quản lý thông tin hợp đồng</p>
                        <img src="../../assets/img/logo.v2.png" alt="logo" class="imgLogo" />
                    </div>
                    <div class="frmGroup">
                        <input ref="username" type="email" v-model="userName" placeholder="Email" />
                        <input ref="password" type="password" v-model="password" placeholder="Mật khẩu" />
                        <a href="javascript:void(0)" class="btnLogin" @click="submitLogin()">Đăng nhập</a>
                    </div>
                </div>
            </div>
            <div class="mainContainer" v-else>
                <p class="lg_Note">Mã xác thực đăng ký đã được gửi tới email:</p>
                <p class="lg_Note" style="font-weight: 700 ; margin-top: 5px; margin-bottom: 5px">{{this.userName}}</p>
                <p class="lg_Note">Điền mã xác thực để hoàn tất đăng ký.</p>

                <div style="display: block">
                    <input class="txtVerify" style="margin-left: 0" v-model="key1" @keypress="restrictChars($event, 1)" />
                    <input class="txtVerify" v-model="key2" @keypress="restrictChars($event, 2)" v-on:keyup.delete="backAndDelete($event)" />
                    <input class="txtVerify" v-model="key3" @keypress="restrictChars($event, 3)" v-on:keyup.delete="backAndDelete($event)" />
                    <input class="txtVerify" v-model="key4" @keypress="restrictChars($event, 4)" v-on:keyup.delete="backAndDelete($event)" />
                </div>
                <a class="btnLogin" style="margin: 29px auto;" href="javascript:void(0)" @click="submitValidate()">Hoàn tất</a>

                <p style="margin-top: 15px; color: #868686; text-align: center;line-height: 1.7em;">Nếu bạn không tìm thấy thư xác thực, vui lòng kiểm tra lại trong mục "Thư rác"<br />hoặc thử đăng nhập lại.</p>

                <a style="margin-top: 25px; background: transparent; border: 1px solid #11bbb5; color:#11bbb5" class="btnLogin" href="javascript:void(0)" @click="showValidate=false">Đăng nhập lại</a>

            </div>
            <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>

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
                avatar: "",
                token: "",
                key1: "",
                key2: "",
                key3: "",
                key4: "",
                showValidate: false,
                isShowLoading: false,
            }
        },
        components: {
            loading,
        },
        mounted() {
            if (localStorage.getItem('jwt') != null) {

                localStorage.removeItem('user');
                localStorage.removeItem('jwt');
                localStorage.removeItem('userss');
            }
            if (localStorage.getItem('jwtv2') != null) {
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
            backAndDelete: (event) => {
                event.target.previousElementSibling.focus();
            },
            restrictChars: (event, idTxt) => {
                var keycode = event.which;
                if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57))) || event.target.value.length > 0) {
                    event.preventDefault();
                }
                else {
                    if (idTxt < 4)
                        event.target.nextElementSibling.focus();
                }
            },
            submitValidate() {
                let _token = this.userName + '+' + this.key1 + this.key2 + this.key3 + this.key4;
                var token = window.btoa(_token);
                console.log(token);
                let promise = UsersRepository.validate(token);
                const self = this;
                promise
                    .then(function (response) {
                        if (response.data.statusCode == 200) {
                            self.showValidate = false;

                            localStorage.setItem('userv2', response.data.username);
                            localStorage.setItem('userssv2', response.data.userss);
                            localStorage.setItem('jwtv2', response.data.token);

                            if (localStorage.getItem('jwtv2') != null) {
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
                            alert("Mã xác thực không hợp lệ");
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
                    };
                    let promise = UsersRepository.checkLogin(dto);
                    promise
                        .then(function (response) {
                            if (response.data.statusCode == 200) {
                                self.showValidate = false;

                                localStorage.setItem('userv2', response.data.username);
                                localStorage.setItem('userssv2', response.data.userss);
                                localStorage.setItem('jwtv2', response.data.token);

                                if (localStorage.getItem('jwtv2') != null) {
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