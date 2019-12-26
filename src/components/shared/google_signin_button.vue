<template>
    <div id="googleLoginButton">
        <div ref="signinBtn" class="btn-sign-in"><img src="../../assets/img/google.svg" /></div>
        <a href="#" @click="signOut()">Sign out</a>
        <a href="#" @click="checkStatus()">CheckStatus</a>
    </div>
</template>

<script>
    export default {
        mounted() {
            window.gapi.load('auth2', () => {
                const auth2 = window.gapi.auth2.init({
                    client_id: "875113149574-kpt6jg37vge4on0tt0edjusn61r8t3tp.apps.googleusercontent.com",
                    cookiepolicy: 'single_host_origin'
                })

                auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
                    this.$emit('done', googleUser)
                }, error => console.log(error))
            })
        },
        methods: {
            signOut() {
                var auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            },
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