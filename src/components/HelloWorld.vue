<template>
    <div>
        <div class="commitBoxContainer">
            <div class="commitBox">
                <h3>Commit by month</h3>
                <table>
                    <tr>
                        <td colspan="2" class="cmBox_Title">
                            <p class="commitBox_value commitBox_value-Big" @click="openPopupChangeCommit()">{{ this.crrCommit.toLocaleString() + " ₫" }}</p>
                            <p class="commitBox_note">Commit <a href="#" class="iPen" @click="openPopupChangeCommit()"><i class="fa fa-pen"></i></a></p>
                        </td>
                    </tr>
                    <tr class="cmBox_FYPNeed">
                        <td>
                            <p class="commitBox_note">FYP</p>
                            <p class="commitBox_value">{{ this.crrFYP.toLocaleString() + " ₫" }}</p>
                        </td>
                        <td>
                            <p class="commitBox_note">Need to do</p>
                            <p class="commitBox_value">{{ this.crrRemain.toLocaleString() + " ₫" }}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- <HeaderCp title="Home" /> -->
        <p>Choose date</p>
        <div class="month-container">
            <MonthPicker @changeMonthInput="changeMonth($event)" />
        </div>

        <div class="screenCover hidden" id="screenCover" @click="closePopupChangeCommit()"></div>
        <section class="popupCommit hidden" id="popupCommit">
            <div>
                <header>
                    <h1>Change commit value {{ this.choosedMonth }}/{{ this.choosedYear }}</h1>
                </header>
                <p>
                    <currency-input :value="crrCommit" :currency="this.currency" :distraction-free="distractionFree" :locale="this.locale" id="txtCommitValue" />
                </p>
                <footer>
                    <div class="button cancel" @click="closePopupChangeCommit()">Cancel</div>
                    <div class="button continue" @click="saveCommit()">Save</div>
                </footer>
            </div>
        </section>
        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
    </div>
</template>

<script>
    import { RepositoryFactory } from '@/repositories/RepositoryFactory'
    const CommitRepository = RepositoryFactory.get('commit')

    import MonthPicker from './month-picker-ez/month-picker-ez.vue'
    import { CurrencyInput, parseCurrency } from 'vue-currency-input'
    import loading from '@/components/shared/loading.vue'
    export default {
        name: "HelloWorld",
        data: function () {
            return {
                choosedMonth: parseInt(String((new Date()).getMonth() + 1).padStart(2, '0')),
                choosedYear: parseInt(String((new Date()).getFullYear())),
                crrCommit: 0,
                crrFYP: 0,
                crrRemain: 0,
                currency: "VND",
                locale: "vi-VN",
                isShowLoading: false
            }
        },
        computed: {
            distractionFree() {
                return {
                    hideNegligibleDecimalDigits: true,
                    hideCurrencySymbol: true,
                    hideGroupingSymbol: false
                }
            }
        },
        created: function () {
            this.getCommitByMonth();
        },
        methods: {
            changeMonth(res) {
                this.choosedMonth = res.month;
                this.choosedYear = res.year;
                this.getCommitByMonth();
            },
            getCommitByMonth() {
                let self = this;
                this.isShowLoading = true;
                let promise = CommitRepository.GetCommitByMonth(this.choosedMonth, this.choosedYear);
                promise
                    .then(function (response) {
                        if (response.data != null && response.data != "") {
                            self.crrCommit = parseInt(response.data.crrCommit);
                            self.crrFYP = parseInt(response.data.fyp);
                            self.crrRemain = parseInt(response.data.remain);
                        }
                        else {
                            self.crrCommit = 0;
                            self.crrFYP = 0;
                            self.crrRemain = 0;
                        }
                        return response;
                    })
                    .catch(function () {
                        alert("Vui lòng đăng nhập lại.");
                        try {
                            var auth2 = window.gapi.auth2.getAuthInstance();
                            auth2.signOut().then(function () {
                                localStorage.removeItem('userv2');
                                localStorage.removeItem('jwtv2');
                                localStorage.removeItem('userssv2');
                                self.$router.push('/login', () => { });
                            });
                        } catch (e) {
                            localStorage.removeItem('userv2');
                            localStorage.removeItem('jwtv2');
                            localStorage.removeItem('userssv2');
                            console.log(e);
                            this.$router.push('/login', () => { });
                        }
                    })
                    .finally(function () {
                        self.isShowLoading = false;
                    })
            },
            saveCommit() {
                let self = this;
                let commitValue = parseCurrency(document.getElementById("txtCommitValue").value, { locale: this.locale, currency: this.currency });
                let promise = CommitRepository.ChangeCommitByMonth(commitValue, parseInt(this.choosedMonth), parseInt(this.choosedYear));
                promise
                    .then(function (response) {
                        if (response.data != null && parseInt(response.data) > 0) {
                            self.crrCommit = commitValue;
                            self.crrRemain = commitValue - self.crrFYP >= 0 ? parseInt(commitValue - self.crrFYP) : 0;
                        } else
                            alert("Got some undefined errors. Please try again later.");
                        return response;
                    })
                    .catch(function () {
                        alert("Đã có lỗi xảy ra vui lòng thử lại sau.");z
                    })
                    .finally(function () {
                        self.closePopupChangeCommit();
                    })
            },
            openPopupChangeCommit() {
                this.changeElementStyle("popupCommit", true);
                this.changeElementStyle("screenCover", true);

                let elm = document.getElementById("txtCommitValue");
                elm.focus();
            },
            closePopupChangeCommit() {
                this.changeElementStyle("popupCommit", false);
                this.changeElementStyle("screenCover", false);
            },
            changeElementStyle(elmName, isShow) {
                let elm = document.getElementById(elmName);
                if (isShow)
                    elm.classList.remove("hidden");
                else
                    elm.classList.add("hidden");
            }
        },
        components: {
            MonthPicker,
            CurrencyInput,
            loading
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .month-container {
        width: 100%;
        text-align: center;
        margin: 10px auto;
    }

    .pCurrentMY {
        margin: 10px auto;
    }

    .commitBoxContainer {
        padding: 15px;
        padding-top: 35px;
        /*background-color: #039789;*/
        background: rgba(3,151,137,1);
        background: -moz-linear-gradient(left, rgba(3,151,137,1) 0%, rgba(0,163,144,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(3,151,137,1)), color-stop(100%, rgba(0,163,144,1)));
        background: -webkit-linear-gradient(left, rgba(3,151,137,1) 0%, rgba(0,163,144,1) 100%);
        background: -o-linear-gradient(left, rgba(3,151,137,1) 0%, rgba(0,163,144,1) 100%);
        background: -ms-linear-gradient(left, rgba(3,151,137,1) 0%, rgba(0,163,144,1) 100%);
        background: linear-gradient(to right, rgba(3,151,137,1) 0%, rgba(0,163,144,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#039789', endColorstr='#00a390', GradientType=1 );
        text-align: center;
        color: #2a3b43;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.5);
        margin-bottom: 20px;
        text-align: center;
    }

        .commitBoxContainer .cmBox_FYPNeed td {
            width: 50%;
        }

            .commitBoxContainer .cmBox_FYPNeed td:first-child {
                border-right: 1px solid #dcdcd9;
            }

        .commitBoxContainer td {
            text-align: center;
        }

            .commitBoxContainer td.cmBox_Title {
                padding-bottom: 10px;
            }

    .commitBox {
        width: 100%;
    }

        .commitBox h3 {
            text-transform: uppercase;
            margin-bottom: 20px;
            color: #fffaed;
        }

        .commitBox table {
            width: 100%;
            text-align: left;
        }

        .commitBox .commitBox_note {
            font-size: 1em;
            color: #b9b9b9;
            margin: 4px 0 6px;
        }

        .commitBox .commitBox_value {
            font-weight: bold;
            color: #fff;
        }

        .commitBox .commitBox_value-Big {
            font-size: 3em;
            font-weight: bold;
        }

        .commitBox .iPen {
            color: #b9b9b9;
            display: inline-block;
            /*border-bottom: 1px solid #fff;*/
            margin-left: 10px;
        }

    /* Modal Popup Styles */

    .popupCommit {
        width: 75%;
        max-width: 300px;
        border: solid 1px #72767b;
        box-shadow: 0px 0px 1px #72767b, 0px 4px 6px #666;
        border-radius: 10px;
        padding: 0px;
        opacity: 1;
        -webkit-transform: scale(1);
        -webkit-transition: all 0.25s ease-in-out;
        position: absolute;
        z-index: 1001;
        margin-left: auto;
        margin-right: auto;
        /*background-image: -webkit-gradient(linear, left top, left bottom, from(#002320), to(#0f8d81e8));*/
        left: 0;
        right: 0;
        top: 23%;
    }

        .popupCommit.hidden {
            opacity: 0;
            -webkit-transform: scale(0);
            top: 50%;
            left: 50%;
            margin: 0px auto;
        }

        .popupCommit > div {
            /*border: solid 2px #e6e7ed;*/
            border-radius: 10px;
            padding: 22px 0 0;
            background-color: rgba(255,255,255,0.9);
            color: #333;
        }

        .popupCommit header {
            background: none;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border: none;
        }

            .popupCommit header > h1 {
                letter-spacing: 1px;
                margin-bottom: 10px;
                font-size: 1.2em;
            }

        .popupCommit input {
            display: block;
            width: 85%;
            padding: 5px 5px;
            background-color: rgba(255, 255, 255, 0.7);
            margin: 24px auto 19px;
            font-size: 1.5em;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .popupCommit footer {
            border-top: 1px solid #dcdcd9;
            display: flex;
        }

            .popupCommit footer > .button {
                flex: 1;
                display: inline-flex;
                text-align: center;
                box-shadow: none;
                height: 32px;
                font-size: 18px;
                line-height: 32px;
                justify-content: center;
                align-content: center;
                padding: 5px 0;
                color: #007aff;
            }

                .popupCommit footer > .button.cancel {
                    border-right: 1px solid #dcdcd9;
                }

    /*.popupCommit footer > .button:hover,
                .popup footer > .button.hover {
                    background-color: #063c37;
                }*/

    .screenCover {
        width: 100%;
        height: 100%;
        display: block;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        z-index: 1000;
        top: 0px;
        left: 0px;
    }

        .screenCover.hidden {
            display: none;
        }
</style>