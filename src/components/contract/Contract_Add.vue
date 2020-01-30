<template>
    <div class="contract_add">
        <h1 class="titleE"><i class="fa fa-chevron-left" @click="$router.go(-1)"></i> Thêm hợp đồng mới</h1>
        <form @submit.prevent="handleSubmit">
            <section class="secPlusInfo">
                <div class="grInput">
                    <label>Mã hợp đồng</label>
                    <i class="fa fa-user-edit"></i>
                    <input class="emInput" v-model="objModel.contractId" required>
                </div>
                <div class="grInput">
                    <label>NFYP</label>
                    <i class="fa fa-money-check-alt"></i>
                    <currency-input class="emInput" style="text-align: right" :value="objModel.Nfyp" :currency="this.currency" :distraction-free="distractionFree" :locale="this.locale" id="objModel.Nfyp" required />
                </div>
                <div class="grInput">
                    <label>RFYP</label>
                    <i class="fa fa-money-check"></i>
                    <currency-input class="emInput" style="text-align: right" :value="objModel.Rfyp" :currency="this.currency" :distraction-free="distractionFree" :locale="this.locale" id="objModel.Rfyp" required />
                </div>
                <div class="grInput">
                    <label>Phí trượt</label>
                    <i class="fa fa-money-bill"></i>
                    <currency-input class="emInput" style="text-align: right" :value="objModel.PhiTruot" :currency="this.currency" :distraction-free="distractionFree" :locale="this.locale" id="objModel.PhiTruot" required />
                </div>
                <div class="grInput">
                    <label>Tên khách hàng</label>
                    <i class="fa fa-user-edit"></i>
                    <input class="emInput" v-model="objModel.Customer_Name" required>
                </div>
                <div class="grInput">
                    <label>Số điện thoại</label>
                    <i class="fa fa-phone-alt"></i>
                    <input class="emInput" v-model="objModel.Customer_Phone" type="number" maxlength="11" min="10" required>
                </div>
                <div class="grInput">
                    <label>Ngày tạo hợp đồng</label>
                    <i class="fa fa-calendar-alt"></i>
                    <input class="emInput" v-model="objModel.DateCreated" type="date" required>
                </div>
                <div class="grInput">
                    <label>Nhân viên</label>
                    <select class="cta_sl" v-model="choosedEmployerId" required>
                        <option value="0">
                            -- Chọn nhân viên --
                        </option>
                        <option v-for="item in this.arrEmployer" v-bind:key="item.id" v-bind:value="item.id" required>
                            {{ item.name }}
                        </option>
                    </select>
                </div>
                <!--<div class="grInput">
                    <label>Contract's type</label>
                    <select class="cta_sl" v-model="choosedTypeId" required>
                        <option value="0">
                            -- Choose contract type --
                        </option>
                        <option v-bind:value="item.value" v-bind:key="item.id" v-for="item in this.contractType">{{ item.text }}</option>
                    </select>
                </div>-->
                

            </section>
            
            <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
            <button class="btnActionContract"><i class="fa fa-save"></i> Lưu</button>
        </form>
    </div>
</template>
<script>
    import loading from '@/components/shared/loading.vue'

    import { RepositoryFactory } from '@/repositories/RepositoryFactory'
    const EmployerRepository = RepositoryFactory.get('employer')
    const ContractRepository = RepositoryFactory.get('contract')

    import { CurrencyInput, parseCurrency } from 'vue-currency-input'

    export default {
        components: {
            loading,
            CurrencyInput,
        },
        data: function () {
            return {
                isShowLoading: false,
                arrEmployer: [],
                arrContracts: [],
                objModel: {
                    Id: 0,
                    contractId: "",
                    Nfyp: 0,
                    Rfyp: 0,
                    EmployerId: 0,
                    TypeId: 1,
                    PhiTruot: 0,
                    Customer_Name: '',
                    Customer_Phone: '',
                    DateCreated: (new Date()).getFullYear() + "-" + String((new Date()).getMonth() + 1).padStart(2, '0') + "-" + String((new Date()).getDate()).padStart(2, '0'),
                    ContractType: 1
                },
                currency: "VND",
                locale: "vi-VN",
                choosedEmployerId: 0,
                choosedTypeId: 1,
                contractType: [
                    { text: 'Month', value: 1 },
                    { text: 'Year', value: 2 }
                ]
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
                .catch(function () {
                    alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
                })
                .finally(function () {
                    self.isShowLoading = false;
                });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                let self = this;
                this.isShowLoading = true;
                this.objModel.DateCreated = new Date(this.objModel.DateCreated);

                this.objModel.Nfyp = parseCurrency(document.getElementById("objModel.Nfyp").value, { locale: this.locale, currency: this.currency });
                this.objModel.Rfyp = parseCurrency(document.getElementById("objModel.Rfyp").value, { locale: this.locale, currency: this.currency });
                this.objModel.PhiTruot = parseCurrency(document.getElementById("objModel.PhiTruot").value, { locale: this.locale, currency: this.currency });
                this.objModel.EmployerId = this.choosedEmployerId;
                this.objModel.TypeId = this.choosedTypeId;

                let promise = ContractRepository.Add(this.objModel);
                promise
                    .then(function (response) {
                        if (response.data != null) {
                            self.$modal.show('dialog', {
                                title: '',
                                text: 'Lưu thông tin thành công!',
                                buttons: [
                                    {
                                        title: 'Close',
                                        default: true,
                                        handler: () => {
                                            self.$router.go(-1);
                                            self.$modal.hide('dialog');
                                        }
                                    }
                                ]
                            });
                        }
                        return response;
                    })
                    .catch(function (error) {
                        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
                        if (error.response.status === 401)
                            self.$router.push("/login");
                    })
                    .finally(function () {
                        self.isShowLoading = false;
                    })
            },
        },
    }
</script>

<style>
    .contract_add {
        position: relative;
        margin-top: 65px;
    }

        .contract_add .titleE {
            position: fixed;
            left: 0;
            right: -1px;
            top: 0;
        }

            .contract_add .titleE i {
                position: absolute;
                left: 16px;
                top: 1.1em;
                font-size: 1em;
            }

        .contract_add section:first-child {
            padding-top: 0;
        }

        .contract_add section {
            padding: 10px 0;
        }

            .contract_add section.secPlusInfo {
                width: 320px;
                margin: auto;
            }

            .contract_add section > div {
                display: inline-block;
            }

                .contract_add section > div.col2 {
                    width: 220px;
                    text-align: left;
                    vertical-align: top;
                }

        .contract_add input.emInput {
            width: 100%;
            margin-bottom: 10px;
            border: none;
            border-bottom: 1px solid #008578;
            background-color: transparent;
            padding: 3px 1px;
        }

            .contract_add input.emInput.txtError {
                border-bottom: 1px solid red;
            }

        .contract_add .grInput label {
            display: block;
            text-align: left;
            margin-left: 8px;
            font-weight: bold;
            margin-top: 10px;
        }

        .contract_add .grInput i {
            display: inline-block;
            width: 30px;
            vertical-align: sub;
            color: #039789;
        }

        .contract_add .grInput input.emInput {
            display: inline-block;
            width: 288px;
        }

        .contract_add .addLblError {
            font-size: 0.8em;
            color: red;
            display: block;
            margin: -6px 0 5px;
        }

        .contract_add .cta_sl {
            border: 1px solid #ccc;
            padding: 5px 10px;
            border-radius: 30px;
            width: 320px;
            margin-top: 7px;
        }
</style>