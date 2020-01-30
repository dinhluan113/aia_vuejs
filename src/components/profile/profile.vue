<template>
    <div id="profile">
        <div class="prf_header">
            <a href="javascript:void(0)" @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></a>
            <p>Tài khoản</p>
            <div class="prf_avatar">
                <i v-if="this.avatar==''" class="fa fa-user"></i>
                <img v-else :src="this.avatar" />
            </div>
        </div>
        <div class="prf_info">
            <p class="prf_profileName">{{ this.userName }}</p>
            <p class="prf_profileEmail" style="color: green">Online</p>
        </div>
        <div class="prf_AccountInfo_Container">
            <div class="prf_AccountInfo">
                <p class="prf_AccountInfo_title">Tài khoản</p>
                <div class="prf_AccountInfo_Group">
                    <div class="prf_AccountInfo_col1"><i class="fa fa-hourglass-start"></i></div>
                    <div class="prf_AccountInfo_col2">
                        <strong>Ngày tạo</strong>
                        <p>{{ this.dateCreated }}</p>
                    </div>
                </div>
                <div class="prf_AccountInfo_Group">
                    <div class="prf_AccountInfo_col1"><i class="fa fa-hourglass-end"></i></div>
                    <div class="prf_AccountInfo_col2">
                        <strong>Ngày hết hạn</strong>
                        <p>{{ this.expirationDate }}</p>
                    </div>
                </div>
                <div class="prf_AccountInfo_Group">
                    <div class="prf_AccountInfo_col1"><i class="fa fa-money-check-alt"></i></div>
                    <div class="prf_AccountInfo_col2">
                        <a href="javascript:void(0)" @click="addCredit()">Gia hạn tài khoản</a>
                    </div>
                </div>
            </div>

            <div class="prf_AccountInfo">
                <p class="prf_AccountInfo_title">Tổng quan</p>
                <div class="prf_AccountInfo_Group">
                    <div class="prf_AccountInfo_col1"><i class="fa fa-file-contract"></i></div>
                    <div class="prf_AccountInfo_col2">
                        <strong>Tổng số hợp đồng đã tạo:</strong>
                        <p>{{ this.totalContracts }}</p>
                    </div>
                </div>
                <div class="prf_AccountInfo_Group">
                    <div class="prf_AccountInfo_col1"><i class="fa fa-user-friends"></i></div>
                    <div class="prf_AccountInfo_col2">
                        <strong>Tổng số nhân viên:</strong>
                        <p>{{ this.totalEmployer }}</p>
                    </div>
                </div>
                <div class="prf_AccountInfo_Group">
                    <div class="prf_AccountInfo_col1"><i class="fa fa-sign-out-alt"></i></div>
                    <div class="prf_AccountInfo_col2">
                        <a href="javascript:void(0)" @click="showPopupComfirmLogout()">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </div>

        <confirmBox @deleteObject="logout($event)" :isShowing.sync="this.isShowPopupDelete" txtBtnConfirm="Đăng xuất" title="Bạn có chắc muốn đăng xuất không?" />
        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
    </div>
</template>
<script>
    import loading from '@/components/shared/loading.vue'

    import confirmBox from '@/components/shared/popupDelete.vue'

    import { RepositoryFactory } from '@/repositories/RepositoryFactory'
    const UserRepository = RepositoryFactory.get('users')

    export default {
        components: {
            loading,
            confirmBox
        },
        data: function () {
            return {
                isShowLoading: false,
                isShowPopupDelete: false,
                userName: "",
                dateCreated: "",
                expirationDate: "",
                avatar: "",
                totalContracts: 0,
                totalEmployer: 0
            }
        },
        mounted() {
            let self = this;
            this.isShowLoading = true;
            let promise = UserRepository.get(localStorage.getItem('userssv2'));
            promise
                .then(function (response) {
                    if (response.data != null) {
                        self.userName = response.data.userName;
                        self.dateCreated = response.data.dateCreated;
                        self.expirationDate = response.data.expirationDate;
                        self.totalContracts = response.data.totalContracts;
                        self.totalEmployer = response.data.totalEmployer;
                        self.avatar = response.data.avatar;
                    }
                    return response;
                })
                .catch(function () {
                    alert("An error occurred, please try again later.");
                    //self.$router.push('/', () => { });
                })
                .finally(function () {
                    self.isShowLoading = false;
                })
        },
        methods: {
            showPopupComfirmLogout() {
                this.isShowPopupDelete = true;
            },
            logout(res) {
                if (res) {
                    let self = this;
                    try {
                        var auth2 = window.gapi.auth2.getAuthInstance();
                        auth2.signOut().then(function () {
                            localStorage.removeItem('userv2');
                            localStorage.removeItem('jwtv2');
                            localStorage.removeItem('userssv2');
                            self.$router.push('/', () => { });
                        });
                    } catch (e) {
                        localStorage.removeItem('userv2');
                        localStorage.removeItem('jwtv2');
                        localStorage.removeItem('userssv2');
                        this.$router.push('/', () => { });
                    }
                }
                else
                    this.isShowPopupDelete = false;
            }
        }
    }
</script>

<style>
    #profile {
        background-color: #f1ebfb;
    }

        #profile .prf_header {
            background-image: url(../../assets/img/profile/topHeader.png);
            height: 200px;
            background-size: cover;
            background-repeat: no-repeat;
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

                #profile .prf_header .prf_avatar img {
                    border-radius: 100px;
                }

        #profile .prf_info {
            padding-top: 65px;
            color: #787786;
            padding-bottom: 25px;
            border-bottom: 1px solid #ccc;
        }

            #profile .prf_info .prf_profileName {
                color: #4a4956;
                font-size: 1.2em;
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

    @media only screen and (min-width : 1024px) {
        #profile .prf_AccountInfo_Container {
            display: flex;
            max-width: 640px;
            margin: auto;
        }

        #profile .prf_AccountInfo {
            display: inline-block;
            flex: 1;
        }
    }
</style>