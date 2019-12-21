<template>
    <div id="contracts">
        <h1 class="cta_Title">Manager your team member's contracts</h1>
        <select class="cta_sl">
            <option value="0">
                All
            </option>
            <option v-for="item in this.arrEmployer" v-bind:key="item.id" :Model="item">
                {{ item.name }}
            </option>
        </select>

        <contractItem v-for="item in this.arrContracts" v-bind:key="item.id" :Model="item" />

        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
        <router-link to="/contracts/add" class="btnAddContract"><i class="fa fa-user-plus"></i></router-link>
    </div>
</template>
<script>
    import loading from '@/components/shared/loading.vue'
    import contractItem from './Contracts_item.vue'

    import { RepositoryFactory } from '@/repositories/RepositoryFactory'
    const EmployerRepository = RepositoryFactory.get('employer')
    const ContractRepository = RepositoryFactory.get('contract')
    export default {
        components: {
            loading,
            contractItem
        },
        data: function () {
            return {
                arrEmployer: [],
                arrContracts: [],
                isShowLoading: false,
            }
        },
        created() {
            let self = this;
            this.isShowLoading = true;
            let promise = EmployerRepository.GetAll(10, 0);
            promise
                .then(function (response) {
                    if (response.data != null) {
                        response.data.lstEmpl.forEach(function (obj) {
                            self.arrEmployer.push(obj);
                        });
                    }
                    return response;
                })
                // Lấy danh sách Hợp đồng
                .then(function () {
                    ContractRepository.GetAll(10, 0).then(function (rs2) {
                        if (rs2.data != null) {
                            rs2.data.forEach(function (obj) {
                                self.arrContracts.push(obj);
                            });
                        }
                        return rs2;
                    });
                })
                .catch(function (error) {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                    console.log(error);
                })
                .finally(function () {
                    self.isShowLoading = false;
                });
        },
        methods: {
        }
    };
</script>

<style>
    #contracts .cta_Title {
        font-size: 1.7em;
        margin: 20px 10px;
        text-align: center;
    }

    #contracts .cta_sl {
        border: 1px solid #ccc;
        padding: 5px 10px;
        border-radius: 30px;
        width: 200px;
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
        background: #4aa1c0;
    }

        .btnAddContract i {
            font-size: 2em;
            color: #fff;
        }
</style>