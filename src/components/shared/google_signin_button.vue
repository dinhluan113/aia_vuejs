<template>
    <div id="googleLoginButton">
        <a href="javascript:void(0)" ref="signinBtn" class="btn-sign-in"><img src="../../assets/img/google.svg" /> LOG IN WITH GOOGLE</a>
        <!--<a href="#" @click="checkStatus()">CheckStatus</a>-->
    </div>
</template>

<script>
    export default {
        mounted() {
            window.gapi.load('auth2', () => {
                const auth2 = window.gapi.auth2.init({
                    client_id: process.env.VUE_APP_CLIENT_ID,
                    cookiepolicy: 'single_host_origin'
                })

                auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
                    this.$emit('done', googleUser)
                }, error => console.log(error))
            })
        },
        methods: {
            checkStatus() {
                var getAuth = window.gapi.auth2.getAuthInstance();
                var isLogedin = getAuth.isSignedIn.get();
                if (isLogedin) {
                    let profile = getAuth.currentUser.get();
                    let basicProfile = profile.getBasicProfile();
                    console.log(basicProfile.getId());
                    console.log(basicProfile.getName());
                    console.log(basicProfile.getEmail());
                    console.log(basicProfile.getImageUrl());
                }
            }
        }
    }
</script>

<style>
    .btn-sign-in {
        background: #e04a32;
        color: #fff;
        padding: 15px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }
    .btn-sign-in img{
        margin-right: 10px;
    }
</style>