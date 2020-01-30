<template>
    <div id="contracts">
        <div class="cta_container">
            <h1 class="cta_Title">
                Danh sách hợp đồng
            </h1>
            <div class="cta_SearchGrp_Gr">
                <div class="cta_SearchGrp">
                    <select class="cta_sl" @change="onChangeEmployer($event)" accesskey="">
                        <option value="0">
                            Tất cả
                        </option>
                        <option v-for="item in this.arrEmployer" v-bind:key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                    <MonthPicker @changeMonthInput="changeMonth($event)" />
                </div>
            </div>
            <div class="cta_lstItems">
                <div class="cta_lstItems_toolbar">
                    <p class="pTotal">
                        Kết quả: <b>{{ this.txtTotal }}</b>
                    </p>
                    <router-link to="/contracts/add" class="btnAddContract"><i class="fa fa-plus"></i> Thêm mới</router-link>
                </div>
                <contractItem v-for="item in this.arrContracts" v-bind:key="item.id" :Model="item" />
            </div>
            <a href="javasciprt:void(0)" @click="loadmore()" v-if="remainItems > 0" class="btnLoadmore">Xem thêm {{ this.remainItems }} contracts</a>
        </div>
        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
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
                .catch(function () {
                    alert("An error occurred, please try again later.");
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
    }

    #contracts .cta_Title {
        font-size: 1.7em;
        padding: 20px 10px;
        color: #fff;
        text-align: center;
        /*background-color: #039789;*/
        background: rgba(41,217,144,1);
        background: -moz-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(41,217,144,1)), color-stop(100%, rgba(10,197,184,1)));
        background: -webkit-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -o-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -ms-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: linear-gradient(135deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#29d990', endColorstr='#0ac5b8', GradientType=1 );
    }

    #contracts .cta_SearchGrp_Gr {
        position: sticky;
        top: 0;
        background-color: #e9e9e9;
        padding: 5px 0;
    }

    #contracts .cta_lstItems {
        max-width: 640px;
        margin: auto;
        padding: 10px 0;
    }

    #contracts .cta_lstItems_toolbar {
        display: block;
        padding: 0 10px;
    }

        #contracts .cta_lstItems_toolbar:after {
            content: '';
            clear: both;
            display: table;
        }


        #contracts .cta_lstItems_toolbar .pTotal {
            text-align: left;
            padding: 5px 0 0px 10px;
            float: left;
        }

        #contracts .cta_lstItems_toolbar .btnAddContract {
            float: right;
            background: rgba(41,217,144,1);
            background: -moz-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
            background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(41,217,144,1)), color-stop(100%, rgba(10,197,184,1)));
            background: -webkit-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
            background: -o-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
            background: -ms-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
            background: linear-gradient(135deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#29d990', endColorstr='#0ac5b8', GradientType=1 );
            color: #fff;
            border-radius: 20px;
            padding: 5px 10px;
            text-align: center;
        }

            #contracts .cta_lstItems_toolbar .btnAddContract i {
                font-size: 1em;
                color: #fff;
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

    .btnActionContract {
        color: #fff;
        padding: 10px;
        border-radius: 30px;
        margin: 15px auto 0;
        display: inline-block;
        min-width: 90px;
        border: none;
        cursor: pointer;
        background: rgba(41,217,144,1);
        background: -moz-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(41,217,144,1)), color-stop(100%, rgba(10,197,184,1)));
        background: -webkit-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -o-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -ms-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: linear-gradient(135deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#29d990', endColorstr='#0ac5b8', GradientType=1 );
    }
</style>