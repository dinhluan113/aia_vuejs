<template>
    <div>
        <div class="commitBoxContainer">
            <div class="commitBox">
                <h3>Commit by month</h3>
                <table>
                    <tr>
                        <td colspan="2">
                            <p class="commitBox_note">Commit <a href="#" class="iPen" @click="openPopupChangeCommit()"><i class="fa fa-pen"></i></a></p>
                            <p class="commitBox_value commitBox_value-Big" @click="openPopupChangeCommit()">{{ this.crrCommit.toLocaleString()+ " ₫" }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="commitBox_note">FYP</p>
                            <p class="commitBox_value">0</p>
                        </td>
                        <td>
                            <p class="commitBox_note">Need to do</p>
                            <p class="commitBox_value">0</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- <HeaderCp title="Home" /> -->
        <p>Chọn tháng/năm</p>
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
    data: function() {
        return {
            choosedMonth: parseInt(String((new Date()).getMonth() + 1).padStart(2, '0')),
            choosedYear: parseInt(String((new Date()).getFullYear())),
            crrCommit: 0,
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
    created: function() {
        this.getCommitByMonth();
    },
    methods: {
        changeMonth(res) {
            console.log("crrMonth: " + res.month + " -  crrYear: " + res.year);
            this.choosedMonth = res.month;
            this.choosedYear = res.year;
            this.getCommitByMonth();
        },
        getCommitByMonth() {
            let self = this;
            this.isShowLoading = true;
            let promise = CommitRepository.GetCommitByMonth(this.choosedMonth, this.choosedYear);
            promise
                .then(function(response) {
                    if (response.data != null) {
                        self.crrCommit = parseInt(response.data);
                    }
                    return response;
                })
                .catch(function(error) {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                    console.log(error);
                    if (error.response.status === 401)
                        self.$router.push("/login");
                })
                .finally(function(){
                    self.isShowLoading = false;
                })
        },
        saveCommit() {
            let self = this;
            let commitValue = parseCurrency(document.getElementById("txtCommitValue").value, { locale: this.locale, currency: this.currency });
            let promise = CommitRepository.ChangeCommitByMonth(commitValue, parseInt(this.choosedMonth), parseInt(this.choosedYear));
            promise
                .then(function(response) {
                    if (response.data != null && parseInt(response.data) > 0) {
                        self.crrCommit = commitValue;
                    } else
                        alert("Got some undefined errors. Please try again later.");
                    return response;
                })
                .catch(function() {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                })
                .finally(function(){
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
    background-color: #039789;
    text-align: center;
    color: #fff;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
}

.commitBox {
    width: calc(100% - 30px);
}

.commitBox h3 {
    text-transform: uppercase;
    margin-bottom: 20px;
}

.commitBox table {
    width: 100%;
    text-align: left;
}

.commitBox .commitBox_note {
    font-size: smaller;
    color: #e0ffd3;
    margin: 4px 0 6px;
}

.commitBox .commitBox_value-Big {
    font-size: 3em;
    margin-bottom: 10px;
}

.commitBox .iPen {
    color: #e0f8be;
    display: inline-block;
    border-bottom: 1px solid #fff;
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
    background-image: -webkit-gradient(linear, left top, left bottom, from(#002320), to(#0f8d81e8));
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

.popupCommit>div {
    border: solid 2px #e6e7ed;
    border-radius: 10px;
    padding: 10px;
    background-image: -webkit-gradient(radial, 50% -1180, 150, 50% -280, 1400, color-stop(0, #076e64), color-stop(0.48, #00a596), color-stop(0.499, #396762), color-stop(0.5, rgba(75, 88, 120, 0)));
    color: #fff;
    text-shadow: 0px -1px 1px #000;
}

.popupCommit header {
    background: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: none;
    color: #fff;
    text-shadow: 0px -2px 1px #000;
}

.popupCommit header>h1 {
    letter-spacing: 1px;
    margin-bottom: 10px;
    font-size: 1.2em;
}

.popupCommit input {
    display: block;
    width: 95%;
    padding: 5px 5px;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    margin: 24px auto 5px;
    font-size: 1.5em;
}

.popupCommit footer {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: justify;
    -webkit-box-sizing: border-box;
    display: -moz-box;
    -moz-box-orient: horizontal;
    -moz-box-pack: justify;
    -moz-box-sizing: border-box;
}

.popupCommit footer>.button {
    -webkit-box-flex: 2;
    -moz-box-flex: 1;
    display: block;
    text-align: center;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    margin: 10px 5px;
    height: 32px;
    font-size: 18px;
    line-height: 32px;
    -webkit-border-radius: 8px;
}

.popupCommit footer>.button.cancel {
    border: 1px solid #508b858a;
}

.popupCommit footer>.button.continue {
    border: 1px solid #508b858a;
    background-color: #0a7e68;
}

.popupCommit footer>.button:hover,
.popup footer>.button.hover {
    background-color: #063c37;
}

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