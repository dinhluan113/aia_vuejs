<template>
    <div class="contract_edit">
        <h1 class="titleE"><i class="fa fa-chevron-left" @click="$router.go(-1)"></i> Edit Contract</h1>
        <form @submit.prevent="handleSubmit">
            <section class="secPlusInfo">
                <div class="grInput">
                    <label>NFYP</label>
                    <i class="fa fa-money-check-alt"></i>
                    <currency-input class="emInput" :value="objModel.nfyp" :currency="this.currency" :distraction-free="distractionFree" :locale="this.locale" id="objModel.nfyp" required />
                </div>
                <div class="grInput">
                    <label>RFYP</label>
                    <i class="fa fa-money-check"></i>
                    <currency-input class="emInput" :value="objModel.rfyp" :currency="this.currency" :distraction-free="distractionFree" :locale="this.locale" id="objModel.rfyp" required />
                </div>
                <div class="grInput">
                    <label>Phí trượt</label>
                    <i class="fa fa-money-bill"></i>
                    <currency-input class="emInput" :value="objModel.phiTruot" :currency="this.currency" :distraction-free="distractionFree" :locale="this.locale" id="objModel.phiTruot" required />
                </div>
                <div class="grInput">
                    <label>Customer's Name</label>
                    <i class="fa fa-user-edit"></i>
                    <input class="emInput" v-model="objModel.customer_Name" required>
                </div>
                <div class="grInput">
                    <label>Customer's Phone</label>
                    <i class="fa fa-phone-alt"></i>
                    <input class="emInput" v-model="objModel.customer_Phone" type="number" maxlength="11" min="10" required>
                </div>
                <div class="grInput">
                    <label>Date</label>
                    <i class="fa fa-calendar-alt"></i>
                    <input class="emInput" v-model="objModel.dateCreated" type="date" required>
                </div>
                <div class="grInput">
                    <label>Employer</label>
                    <select class="cta_sl" v-model="choosedEmployerId" required>
                        <option value="0">
                            -- Choose a Employer --
                        </option>
                        <option v-for="item in this.arrEmployer" v-bind:key="item.id" v-bind:value="item.id" required>
                            {{ item.name }}
                        </option>
                    </select>
                </div>
                <div class="grInput">
                    <label>Contract's type</label>
                    <select class="cta_sl" v-model="choosedTypeId" required>
                        <option value="0">
                            -- Choose contract type --
                        </option>
                        <option v-bind:value="item.value" v-bind:key="item.id" v-for="item in this.contractType">{{ item.text }}</option>
                    </select>
                </div>
            </section>
            <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
            <button class="btnAddContract"><i class="fa fa-save"></i></button>
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
                    id: 0,
                    nfyp: 0,
                    rfyp: 0,
                    employerId: 0,
                    typeId: 0,
                    phiTruot: 0,
                    customer_Name: '',
                    customer_Phone: '',
                    dateCreated: (new Date()).getFullYear() + "-" + String((new Date()).getMonth() + 1).padStart(2, '0') + "-" + String((new Date()).getDate()).padStart(2, '0'),
                    contractType: 0
                },
                currency: "VND",
                locale: "vi-VN",
                choosedEmployerId: 0,
                choosedTypeId: 0,
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
        mounted() {
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
                .then(function () {
                    ContractRepository.GetById(self.$route.params.id).then(function (rs2) {
                        if (rs2.data != null) {
                            self.objModel = JSON.parse(JSON.stringify(rs2.data));
                            self.objModel.dateCreated = rs2.data.dateCreated.substring(0, 10);
                            self.choosedEmployerId = self.objModel.employerId;
                            self.choosedTypeId = self.objModel.typeId;
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
            handleSubmit(e) {
                e.preventDefault();

                let self = this;
                this.isShowLoading = true;
                this.objModel.dateCreated = new Date(this.objModel.dateCreated);

                this.objModel.nfyp = parseCurrency(document.getElementById("objModel.nfyp").value, { locale: this.locale, currency: this.currency });
                this.objModel.rfyp = parseCurrency(document.getElementById("objModel.rfyp").value, { locale: this.locale, currency: this.currency });
                this.objModel.phiTruot = parseCurrency(document.getElementById("objModel.phiTruot").value, { locale: this.locale, currency: this.currency });
                this.objModel.employerId = this.choosedEmployerId;
                this.objModel.typeId = this.choosedTypeId;

                let promise = ContractRepository.Update(this.objModel);
                promise
                    .then(function (response) {
                        if (response.data != null) {
                            self.$modal.show('dialog', {
                                title: '',
                                text: 'Contract successfully saved!',
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
                        alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                        console.log(error);
                        if (error.response.status === 401)
                            self.$router.push("/login");
                    })
                    .finally(function () {
                        self.isShowLoading = false;
                    })
            }
        },
    }
</script>

<style>
    .contract_edit {
        position: relative;
        margin-top: 65px;
    }

        .contract_edit .titleE {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
        }

            .contract_edit .titleE i {
                position: absolute;
                left: 16px;
                top: 1.1em;
                font-size: 1em;
            }

        .contract_edit section:first-child {
            padding-top: 0;
        }

        .contract_edit section {
            padding: 10px 0;
        }

            .contract_edit section.secPlusInfo {
                width: 320px;
                margin: auto;
            }

            .contract_edit section > div {
                display: inline-block;
            }

                .contract_edit section > div.col2 {
                    width: 220px;
                    text-align: left;
                    vertical-align: top;
                }

        .contract_edit input.emInput {
            width: 100%;
            margin-bottom: 10px;
            border: none;
            border-bottom: 1px solid #008578;
            background-color: transparent;
            padding: 3px 1px;
        }

            .contract_edit input.emInput.txtError {
                border-bottom: 1px solid red;
            }

        .contract_edit .grInput label {
            display: block;
            text-align: left;
            margin-left: 8px;
            font-weight: bold;
            margin-top: 10px;
        }

        .contract_edit .grInput i {
            display: inline-block;
            width: 30px;
            vertical-align: sub;
            color: #039789;
        }

        .contract_edit .grInput input.emInput {
            display: inline-block;
            width: 288px;
        }

        .contract_edit .addLblError {
            font-size: 0.8em;
            color: red;
            display: block;
            margin: -6px 0 5px;
        }

        .contract_edit .cta_sl {
            border: 1px solid #ccc;
            padding: 5px 10px;
            border-radius: 30px;
            width: 320px;
            margin-top: 7px;
        }
</style>