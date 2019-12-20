<template>
    <div class="employer_edit">
        <h1 class="titleE"><i class="fa fa-chevron-left" @click="$router.go(-1)"></i> Edit Employer</h1>
        <form @submit.prevent="handleSubmit">
            <section>
                <div class="col1">
                    <img src="@/assets/img/employer.png" />
                </div>
                <div class="col2">
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.name.required}" v-model="objModel.name" placeholder="add name" required>
                    <span v-if="!$v.objModel.name.required" class="addLblError">Name is required</span>
                    <span v-if="!$v.objModel.name.minLength" class="addLblError">Name must have at least {{$v.objModel.name.$params.minLength.min}} letters.</span>
                    <input class="emInput" v-model="objModel.dateCreated" type="date" :v="this.objModel.dateCreated">
                    <span v-if="!$v.objModel.dateCreated.required" class="addLblError">Date Created is required</span>
                </div>
            </section>
            <section class="secPlusInfo">
                <div class="grInput">
                    <i class="fa fa-phone-alt"></i>
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.phone.isPhoneNumber}" v-model="objModel.phone" placeholder="Phone">
                    <span v-if="!$v.objModel.phone.isPhoneNumber" class="addLblError">Phone is invalid</span>
                </div>
                <div class="grInput">
                    <i class="fa fa-envelope"></i>
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.email.email}" v-model="objModel.email" type="Email" placeholder="Email">
                    <span v-if="!$v.objModel.email.email" class="addLblError">Email is invalid</span>
                </div>
            </section>

            <div class="btnDelete" @click="deleteEmployer()"><i class="fa fa-trash" style="margin-right: 10px;"></i> Delete</div>    
            <deleteObject @deleteObject="evDeleteObject($event)" :isShowing.sync="this.isShowPopupDelete" title="Are you sure you want to continue? All infomations, contracts of this Employer will be deleted." />

            <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
            <button class="btnAddEmployer"><i class="fa fa-save"></i></button>
        </form>
    </div>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { validPhone } from "@/helpers/ValidateHelper.js";
const isPhoneNumber = (value) => validPhone(value)
import loading from '@/components/shared/loading.vue'

import deleteObject from '@/components/shared/popupDelete.vue'

import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const EmployerRepository = RepositoryFactory.get('employer')

export default {
    components: {
        loading,
        deleteObject
    },
    data: function() {
        return {
            isShowLoading: false,
            objModel: {
                id: 0,
                name: "",
                dateCreated: new Date(),
                phone: "",
                email: "",
            },
            isShowPopupDelete: false
        }
    },
    mounted: function() {
        let self = this;
        this.isShowLoading = true;
        let promise = EmployerRepository.GetById(this.$route.params.emid);
        promise
            .then(function(response) {
                if (response.data != null) {
                    self.objModel = JSON.parse(JSON.stringify(response.data));
                    self.objModel.dateCreated = response.data.dateCreated.substring(0,10);
                }
                return response;
            })
            .catch(function(error) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                console.log(error);
            })
            .finally(function() {
                self.isShowLoading = false;
            })
    },
    validations: {
        objModel: {
            email: { email },
            name: { required, minLength: minLength(2) },
            dateCreated: { required },
            phone: { isPhoneNumber },
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                console.log("Invalid Form");
                return;
            }
            let self = this;
            this.isShowLoading = true;
            // this.objModel.DateCreated = new Date(this.objModel.DateCreated);
            let promise = EmployerRepository.Update(this.objModel);
            promise
                .then(function(response) {
                    if (response.data != null) {
                        alert("Employer successfully saved");
                    }
                    return response;
                })
                .catch(function(error) {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                    console.log(error);
                    if (error.response.status === 401)
                        self.$router.push("/login");
                })
                .finally(function() {
                    self.isShowLoading = false;
                })
        },
        deleteEmployer(){
            this.isShowPopupDelete = true;
        },
        evDeleteObject(res){
            let self = this;
            if(res) {
                this.isShowLoading = true;
                let promise = EmployerRepository.Delete(this.objModel.id);
                promise
                    .then(function(response) {
                        if (response.data != null) {
                            self.$router.push("/employees");
                        }
                        return response;
                    })
                    .catch(function(error) {
                        alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                        console.log(error);
                        if (error.response.status === 401)
                            self.$router.push("/login");
                    })
                    .finally(function() {
                        self.isShowLoading = false;
                    })
            }
            this.isShowPopupDelete = false;

        }
    },
}
</script>

<style>
.titleE {
    margin-bottom: 15px;
}

.titleE i {
    position: absolute;
    left: 16px;
    top: 1.1em;
    font-size: 1em;
}

.employer_edit section {
    padding: 10px 0;
}

.employer_edit section.secPlusInfo {
    width: 320px;
    margin: auto;
    padding-bottom: 70px;
}

.employer_edit section>div {
    display: inline-block;
}

.employer_edit section>div.col1 {
    width: 100px;
}

.employer_edit section>div.col1 img {
    max-width: 70%;
    border-radius: 50%;
    vertical-align: top;
}

.employer_edit section>div.col2 {
    width: 220px;
    text-align: left;
    vertical-align: top;
}

.employer_edit input.emInput {
    width: 100%;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #008578;
    background-color: transparent;
    padding: 3px 1px;
}

.employer_edit input.emInput.txtError {
    border-bottom: 1px solid red;
}

.employer_edit .grInput i {
    display: inline-block;
    width: 30px;
    vertical-align: sub;
    color: #039789;
}

.employer_edit .grInput input.emInput {
    display: inline-block;
    width: 288px;
}

.employer_edit .addLblError {
    font-size: 0.8em;
    color: red;
    display: block;
    margin: -6px 0 5px;
}
.employer_edit .btnDelete {
    display: block;
    background-color: #fff;
    padding: 10px 20px;
    margin: 10px;
    margin-top: 50px;
    width: 280px;
    margin: auto;
    border-radius: 4px;
    text-align: left;
    color: red;
    border: 1px solid #ffa9ba;
}
</style>