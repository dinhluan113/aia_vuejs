<template>
    <div id="contracts">
        <div class="cta_container">
            <h1 class="cta_Title">Manager your team member's contracts</h1>
            <div class="cta_SearchGrp_Gr">
                <div class="cta_SearchGrp">
                    <select class="cta_sl" @change="onChangeEmployer($event)" accesskey="">
                        <option value="0">
                            All
                        </option>
                        <option v-for="item in this.arrEmployer" v-bind:key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                    <MonthPicker @changeMonthInput="changeMonth($event)" />
                </div>
            </div>

            <p class="pTotal">Total results: <b>{{ this.txtTotal }}</b></p>
            <contractItem v-for="item in this.arrContracts" v-bind:key="item.id" :Model="item" />

            <a href="javasciprt:void(0)" @click="loadmore()" v-if="remainItems > 0" class="btnLoadmore">Load more {{ this.remainItems }} contracts</a>
        </div>
        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
        <router-link to="/contracts/add" class="btnAddContract"><i class="fa fa-plus"></i></router-link>
    </div>
</template>
<script>
    import loading from '@/components/shared/loading.vue'
    import contractItem from './Contracts_item.vue'
    import MonthPicker from '@/components/month-picker-ez/month-picker-ez.vue'

    import { RepositoryFactory } from '@/repositories/RepositoryFactory'
    const EmployerRepository = RepositoryFactory.get('employer')
    const ContractRepository = RepositoryFactory.get('contract')
    export default {
        components: {
            loading,
            contractItem,
            MonthPicker,
        },
        data: function () {
            return {
                arrEmployer: [],
                arrContracts: [],
                isShowLoading: false,
                remainItems: 0,
                crrPageIndex: 0,
                crrEmployerId: 0,
                crrMonth: new Date().getMonth() + 1,
                crrYear: new Date().getFullYear(),
                txtTotal: ''
            }
        },
        mounted() {
            let self = this;
            let promise = EmployerRepository.GetAll(10, 0);
            this.isShowLoading = true;
            promise
                .then(function (response) {
                    if (response.data != null) {
                        response.data.lstEmpl.forEach(function (obj) {
                            self.arrEmployer.push(obj);
                        });
                        self.isShowLoading = false;
                    }
                    return response;
                })
                // Lấy danh sách Hợp đồng
                .then(function () {
                    self.crrPageIndex = 0;
                    self.loadContractsGetAll();
                })
                .catch(function (error) {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                    console.log(error);
                })
                .finally(function () {
                });
        },
        methods: {
            onChangeEmployer(event) {
                this.crrEmployerId = parseInt(event.target.value);
                this.crrPageIndex = 0;
                this.loadContractsGetAll();
            },
            loadContractsGetAll() {
                let self = this;
                this.isShowLoading = true;
                ContractRepository.GetAll(10, self.crrPageIndex, self.crrEmployerId, self.crrMonth, self.crrYear).then(function (rs2) {
                    if (rs2.data != null) {
                        if (self.crrPageIndex <= 0)
                            self.arrContracts = [];
                        rs2.data.lst.forEach(function (obj) {
                            self.arrContracts.push(obj);
                        });
                        self.remainItems = rs2.data.remain;
                        self.txtTotal = self.arrContracts.length + "/" + (self.arrContracts.length + rs2.data.remain)
                    }
                    return rs2;
                })
                    .finally(function () {
                        self.isShowLoading = false;
                    });
            },
            loadmore() {
                this.crrPageIndex += 1;
                this.loadContractsGetAll();
            },
            changeMonth(res) {
                this.crrPageIndex = 0;
                this.crrMonth = res.month;
                this.crrYear = res.year;
                this.loadContractsGetAll();
            }
        }
    };
</script>

<style>
    #contracts .cta_container {
        position: relative;
        height: calc(100vh - 62px);
        height: -webkit-calc(100vh - 62px);
        height: -moz-calc(100vh - 62px);
        overflow-y: scroll;
    }

    #contracts .cta_Title {
        font-size: 1.7em;
        margin: 20px 10px;
        text-align: center;
    }

    #contracts .cta_SearchGrp_Gr {
        position: sticky;
        top: 0;
        background-color: rgba(242, 242, 242, 0.85);
        padding: 5px 0;
    }

    #contracts .pTotal {
        text-align: left;
        padding: 5px 0 0px 10px;
    }

    #contracts .cta_SearchGrp {
        display: flex;
        width: 320px;
        margin: auto;
        justify-content: center;
        align-items: center;
    }

        #contracts .cta_SearchGrp .cta_sl {
            border: 1px solid #ccc;
            padding: 5px 10px;
            border-radius: 30px;
            display: inline-block;
            width: 150px;
            margin-right: 5px;
            background: transparent;
        }

        #contracts .cta_SearchGrp .mpe_monthPickerContainer {
            display: inline-block;
            width: 150px;
            margin-left: 5px;
        }

        #contracts .cta_SearchGrp .mpe_crrChooseMonth input {
            width: 93px;
        }

    #contracts .btnLoadmore {
        background-color: #029d8d;
        border-radius: 28px;
        border: 1px solid #18ab29;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 14px;
        font-weight: bold;
        padding: 8px 19px;
        text-decoration: none;
        text-shadow: -1px -1px 0px #2f6627;
        margin-bottom: 5px;
    }

        #contracts .btnLoadmore:hover {
            background-color: #5cbf2a;
        }

        #contracts .btnLoadmore:active {
            position: relative;
            top: 1px;
        }

    .btnAddContract {
        box-shadow: 0px 0px 8px rgba(0,0,0,0.5);
        border-radius: 4em;
        width: 4em;
        position: fixed;
        bottom: 91px;
        z-index: 1;
        right: 10px;
        width: 3.5em;
        height: 3.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #039789;
        border: none;
    }

        .btnAddContract i {
            font-size: 2em;
            color: #fff;
        }
</style>