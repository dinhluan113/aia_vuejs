<template>
    <div id="frmValidate">
        <div class="lgContainer">
            <div v-if="this.isVerifiedStatus == 0">
                <p class="lg_msg_smaller">
                    Please wait a moment
                </p>
            </div>
            <div v-else-if="this.isVerifiedStatus == 1">
                <img src="@/assets/img/check.png" style="margin: 0 0 25px;" />
                <p class="lg_msg">
                    Your account has been successfully verified.
                </p>
                <p class="lg_msg_smaller">
                    <router-link to="/" class="frmValid_btnNext">Click here to continue.</router-link>
                </p>
            </div>
            <div v-else>
                <p class="lg_msg">
                    An error occurred, please try again later.
                </p>
            </div>
            <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
        </div>
    </div>
</template>
<script>
    import loading from '../shared/loading.vue'
    import { RepositoryFactory } from '../../repositories/RepositoryFactory'
    const UsersRepository = RepositoryFactory.get('users')
    export default {
        data() {
            return {
                isShowLoading: false,
                isVerifiedStatus: 0,
            }
        },
        components: {
            loading,
        },
        mounted() {
            let self = this;
            this.isShowLoading = true;
            let promise = UsersRepository.validate(this.$route.query.token);
            promise
                .then(function (response) {
                    if (response.data != null) {
                        if (parseInt(response.data.statusCode) == 200) {
                            self.isVerifiedStatus = 1;
                            localStorage.setItem('userv2', response.data.username)
                            localStorage.setItem('userssv2', response.data.userss)
                            localStorage.setItem('jwtv2', response.data.token)
                        }
                        else
                            self.isVerifiedStatus = 2;
                    }
                    return response;
                })
                .catch(function () {
                    alert("An error occurred, please try again later.");
                })
                .finally(function () {
                    self.isShowLoading = false;
                })
        },
        methods: {

        },
    }
</script>

<style>
    #app {
        margin-bottom: 0;
    }

    #frmValidate {
        position: fixed;
        background-image: url(../shared/bg.png);
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-size: cover;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        max-width: 640px;
        margin: auto;
    }

        #frmValidate .lg_title {
            color: #fff;
            font-size: 2em;
            margin: 51px 0;
        }

        #frmValidate .lgContainer {
            margin-top: -40%;
        }

        #frmValidate .lg_msg, #frmValidate .lg_msg strong {
            font-size: 1.2em;
            line-height: 1.5em;
            color: #fff;
        }

        #frmValidate .lg_msg_smaller {
            margin-top: 15px;
            color: #d4d4d4;
        }

        #frmValidate .frmValid_btnNext {
            background: #ce4b3b;
            color: #fff;
            padding: 11px 0;
            margin: 10px 0;
            display: block;
            width: 213px;
            margin: auto;
            border-radius: 4px;
            font-size: 1.2em;
        }
</style>