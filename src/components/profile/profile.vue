<template>
    <div id="profile">
        <div class="prf_header">
            <a href="javascript:void(0)" @click="this.$router.go(-1)"><i class="fa fa-arrow-left"></i></a>
            <p>Profile Settings</p>
            <div class="prf_avatar">
                <i class="fa fa-user"></i>
            </div>
        </div>
        <div class="prf_info">
            <p class="prf_profileName">dinhluan113</p>
            <p class="prf_profileEmail">nguyendinhluan19@gmail.com</p>
        </div>
        <div class="prf_AccountInfo">
            <p class="prf_AccountInfo_title">Account Info</p>
            <div class="prf_AccountInfo_Group">
                <div class="prf_AccountInfo_col1"><i class="fa fa-hourglass-start"></i></div>
                <div class="prf_AccountInfo_col2">
                    <strong>Date created</strong>
                    <p>20/12/2019</p>
                </div>
            </div>
            <div class="prf_AccountInfo_Group">
                <div class="prf_AccountInfo_col1"><i class="fa fa-hourglass-end"></i></div>
                <div class="prf_AccountInfo_col2">
                    <strong>Expiration Date</strong>
                    <p>20/12/2020</p>
                </div>
            </div>
            <div class="prf_AccountInfo_Group">
                <div class="prf_AccountInfo_col1"><i class="fa fa-money-check-alt"></i></div>
                <div class="prf_AccountInfo_col2">
                    <a href="javascript:void(0)" @click="addCredit()">Add credit</a>
                </div>
            </div>
        </div>

        <div class="prf_AccountInfo">
            <p class="prf_AccountInfo_title">Summary</p>
            <div class="prf_AccountInfo_Group">
                <div class="prf_AccountInfo_col1"><i class="fa fa-file-contract"></i></div>
                <div class="prf_AccountInfo_col2">
                    <strong>Total contracts:</strong>
                    <p>00000</p>
                </div>
            </div>
            <div class="prf_AccountInfo_Group">
                <div class="prf_AccountInfo_col1"><i class="fa fa-user-friends"></i></div>
                <div class="prf_AccountInfo_col2">
                    <strong>Total employees:</strong>
                    <p>00000</p>
                </div>
            </div>
            <div class="prf_AccountInfo_Group">
                <div class="prf_AccountInfo_col1"><i class="fa fa-sign-out-alt"></i></div>
                <div class="prf_AccountInfo_col2">
                    <a href="javascript:void(0)" @click="logout()">Log out</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                Model: null
            }
        },
        mounted() {

        },
        methods: {
            logout() {
                let r = confirm("Are you sure to logout!");
                if (r == true) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('jwt');
                    this.$router.push('/', () => { });
                }
            }
        }
    }
</script>

<style>
    #profile {
        background-color: #f1ebfb;
        height: calc(100vh - 62px);
        height: -webkit-calc(100vh - 62px);
        height: -moz-calc(100vh - 62px);
        overflow-y: scroll;
    }

        #profile .prf_header {
            background-image: url(../../assets/img/profile/topHeader.png);
            height: 200px;
            background-size: cover;
            background-repeat: no-repeat;
            border-bottom-left-radius: 7em;
            text-align: left;
            color: #fff;
            position: relative;
        }

            #profile .prf_header a {
                display: inline-block;
                text-align: left;
                padding: 2em;
            }

                #profile .prf_header a i {
                    color: #fff;
                }

            #profile .prf_header p {
                color: #fff;
                margin: 0 1em;
                font-size: 2em;
            }

            #profile .prf_header .prf_avatar {
                width: 100px;
                height: 100px;
                background-color: rgba(255,255,255,0.8);
                border-radius: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                margin: auto;
                left: 0;
                right: 0;
                bottom: -50px;
                box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
            }

                #profile .prf_header .prf_avatar i {
                    font-size: 3em;
                    color: #712ce2;
                }

        #profile .prf_info {
            padding-top: 65px;
            color: #787786;
            padding-bottom: 25px;
            border-bottom: 1px solid #ccc;
        }

            #profile .prf_info .prf_profileName {
                color: #4a4956;
                font-size: 2em;
            }

        #profile .prf_AccountInfo {
            text-align: left;
            background: #fff;
            padding: 20px;
            margin: 10px;
            border-radius: 10px;
            box-shadow: 0 0 11px -5px rgba(0,0,0,0.5);
        }

            #profile .prf_AccountInfo .prf_AccountInfo_title {
                color: #4a4956;
                font-weight: bold;
                font-size: 1.2em;
            }

            #profile .prf_AccountInfo .prf_AccountInfo_Group {
                display: flex;
                margin: 15px 0;
                color: #787786;
            }

                #profile .prf_AccountInfo .prf_AccountInfo_Group:first-child {
                    margin-top: 0;
                }

                #profile .prf_AccountInfo .prf_AccountInfo_Group:last-child {
                    margin-bottom: 0;
                }

            #profile .prf_AccountInfo .prf_AccountInfo_col1 {
                min-width: 21px;
                justify-content: center;
                align-items: center;
                display: inline-flex;
                padding: 0 10px 0 0;
            }

                #profile .prf_AccountInfo .prf_AccountInfo_col1 i {
                    font-size: 1.2em;
                    color: #712ce2;
                }

            #profile .prf_AccountInfo .prf_AccountInfo_col2 {
                line-height: 1.5em;
            }
</style>