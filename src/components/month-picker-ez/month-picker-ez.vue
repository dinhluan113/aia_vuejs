<template>
    <div class="mpe_monthPickerContainer">
        <div class="mpe_crrChooseMonth" v-on:click="showHidePopup()">
            <input :value="month + '/' + year" placeholder="dd/MM" readonly />
            <div class="mpe_iconCalendar">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAZdJREFUOI211L9rlEEQxvEPIWBzZyREoxYmGsHYnmKhrUUKA0mlRZogKHaCduJ/oGDA2soiWGhjYSkWQvxR2QYhXYiIMSJCyJ0WO3uO8S6mMAPDu9/Z5312mV2WP2MIr/ATnzHt75jFl9C8RLOHphvXQngLS3jfQ/MBr3E7tPN5ciC+TUziePB9vMVw1HMO4Q3uhXYi6o1qegRrsVpNeLitlvNBaHJtFYcGcAYHd+rDLmMUrcE+k89ioX4xi/FeE/0MZ/6xm2OROxpexEqMF3AXG2mBLTwPHsYd5TZQDubFdsMVLMf4Gz5iPXg1DOv8SGgqd33qtflvkXe4EKvCeTzCZvC4cjVqb/ehhcXg/dn0UohbOBD5FGOJr+Nq4gk8SXwuPKbyDjf87tkmvib+rvSw8mBo1tO/2OMeziinSenZ5dgZXEAn6Zs4gbngo70MtyIp/cjcQTtxO2qZu1EP5WSqLSrNrjGHK4lH8DjxZHhM7UkPOzGex6cYn8IN/Ag+G7rDwQ2cxs3g0fi2KQ/mO/3fvt3mEhq/AElvdtBGah91AAAAAElFTkSuQmCC" />
            </div>
        </div>
        <div class="mpe_Popup" :class="{'hidePopup' : this.hidePopup}">
            <table class="table-condensed">
                <thead>
                    <tr>
                        <th class="prev" style="visibility: visible; cursor: pointer" @click="changeYear(true)">«</th>
                        <th class="crrYear">{{ this.tmpYear }}</th>
                        <th class="next" style="visibility: visible; cursor: pointer" @click="changeYear(false)">»</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 4" :key="i">
                        <td v-for="j in 3" :key="j" :class="{ 'active' : ((j - 1) + (i - 1)*3 + 1) == month && year == tmpYear, 'circleMonth': typeMonth === 1 || typeMonth === 2}">
                            <span v-on:click="changeMonth()" :data-month="(j - 1) + (i - 1)*3 + 1">{{ lstYearNameTmp[(j - 1) + (i - 1)*3] }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            typeMonth: {
                type: Number,
                default: 2
            },
            lstYearName: {
                type: Array,
                default: () => ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
            }
        },
        data: function () {
            return {
                month: String((new Date()).getMonth() + 1).padStart(2, '0'),
                year: new Date().getFullYear(),
                tmpYear: new Date().getFullYear(),
                hidePopup: true,
                lstYearNameTmp: this.typeMonth === 0 ? ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"] : this.typeMonth === 1 ? ["T.1", "T.2", "T.3", "T.4", "T.5", "T.6", "T.7", "T.8", "T.9", "T.10", "T.11", "T.12"] : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
            }
        },
        methods: {
            changeMonth: function () {
                var iM = event.target.getAttribute('data-month');
                this.year = this.tmpYear;
                this.month = iM;
                this.showHidePopup();
                var returnObj = { month: iM, year: this.year };
                this.$emit("changeMonthInput", returnObj);
            },
            showHidePopup: function () {
                this.hidePopup = !this.hidePopup;
            },
            changeYear(isPreOrNext) {
                if (isPreOrNext)
                    this.tmpYear = parseInt(this.tmpYear) - 1;
                else
                    this.tmpYear = parseInt(this.tmpYear) + 1;
            },
        }
    };
</script>

<style>
    .mpe_monthPickerContainer {
        display: block;
        width: 200px;
        position: relative;
        margin: auto;
    }

    .mpe_crrChooseMonth {
        display: block;
        width: 100%;
        height: 30px;
        border: 1px solid #cccccc;
        border-radius: 4px;
    }

        .mpe_crrChooseMonth input {
            display: inline-block;
            width: 156px;
            border: none;
            height: 26px;
            padding: 2px 0 2px 10px;
            vertical-align: top;
            cursor: pointer;
            border-radius: 4px;
            background-color: transparent;
        }

            .mpe_crrChooseMonth input:focus {
                outline: none;
            }

        .mpe_crrChooseMonth .mpe_iconCalendar {
            display: inline-block;
            width: 33px;
            height: 25px;
            background-color: transparent;
            text-align: center;
            padding-top: 5px;
            cursor: pointer;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 1px solid #ccc;
        }

    .mpe_Popup {
        margin-top: 10px;
        box-shadow: 0px 2px 6px rgba(0,0,0,0.5);
        left: 0;
        right: -2px;
        top: 32px;
        padding-bottom: 5px;
        position: absolute;
        background: #fff;
        z-index: 1;
    }

        .mpe_Popup.hidePopup {
            display: none;
        }

        .mpe_Popup table {
            margin: 0;
            padding: 0;
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            text-align: center;
            background-color: #fff;
        }

        .mpe_Popup thead {
            background-color: #039789;
            color: #fff;
            border-bottom: 7px solid #fff;
        }

            .mpe_Popup thead .crrYear {
                font-size: 1.2em;
            }

        .mpe_Popup th {
            padding: 10px 0;
        }

        .mpe_Popup td {
            width: 30%;
        }

            .mpe_Popup td span {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px 0;
                cursor: pointer;
            }

                .mpe_Popup td span:hover {
                    background-color: #eee;
                }

            .mpe_Popup td.circleMonth span {
                width: 30px;
                margin: auto;
            }

            .mpe_Popup td.active span {
                background-color: #00a596;
                color: #fff;
            }

            .mpe_Popup td.active.circleMonth span {
                border-radius: 30px;
            }

            .mpe_Popup td.circleMonth span:hover {
                border-radius: 30px;
            }
</style>