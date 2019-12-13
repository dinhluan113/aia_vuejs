<template>
    <div>
        <div class="commitBoxContainer">
            <div class="commitBox">
                <h3>Commit by month</h3>
                <table>
                    <tr>
                        <td colspan="2">
                            <p class="commitBox_note">Commit</p>
                            <p class="commitBox_value commitBox_value-Big">0</p>
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
    
        <a href="javascript:void(0)" @click="testBtn()">Check thử xem Auth</a>
    </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const CommitRepository = RepositoryFactory.get('commit')

import MonthPicker from './month-picker-ez/month-picker-ez.vue'
export default {
    name: "HelloWorld",
    methods: {
        changeMonth(res) {
            console.log("crrMonth: " + res.month);
            console.log("crrYear: " + res.year);
        },
        testBtn() {
            let self = this;
            let promise = CommitRepository.ChangeCommitByMonth("123", "12");
            promise
                .then(function(response) {
                    if (response.data != null) {
                        console.log(response.data);
                    } else {
                        alert("Sai tên đăng nhập hoặc mật khẩu");
                    }
                    return response;
                })
                .catch(function(error) {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                    if (error.response.status === 401)
                        self.$router.push("/login");
                })
                .finally(function() {});
        }
    },
    components: {
        MonthPicker
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
</style>