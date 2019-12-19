<template>
    <div class="employer_add">
        <h1 class="titleE"><i class="fa fa-chevron-left" @click="$router.go(-1)"></i> Add Employer</h1>
        <form @submit.prevent="handleSubmit">
            <section>
                <div class="col1">    
                    <img src="@/assets/img/employer.png" />    
                </div>    
                <div class="col2">    
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.Name.required}" v-model="objModel.Name" placeholder="add name" required>     
                    <span v-if="!$v.objModel.Name.required" class="addLblError">Name is required</span>
                    <span v-if="!$v.objModel.Name.minLength" class="addLblError">Name must have at least {{$v.objModel.Name.$params.minLength.min}} letters.</span>
                    <input class="emInput" v-model="objModel.DateCreated" type="date" :v="this.objModel.DateCreated">     
                    <span v-if="!$v.objModel.DateCreated.required" class="addLblError">Date Created is required</span> 
                </div>    
            </section>    
            <section class="secPlusInfo">    
                <div class="grInput">    
                    <i class="fa fa-phone-alt"></i>    
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.Phone.isPhoneNumber}" v-model="objModel.Phone" placeholder="Phone">      
                    <span v-if="!$v.objModel.Phone.isPhoneNumber" class="addLblError">Phone is invalid</span>
                </div>    
                <div class="grInput">    
                    <i class="fa fa-envelope"></i>    
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.Email.email}" v-model="objModel.Email" type="Email" placeholder="Email">      
                    <span v-if="!$v.objModel.Email.email" class="addLblError">Email is invalid</span>
                </div>    
            </section>    
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

import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const EmployerRepository = RepositoryFactory.get('employer')

export default {
    components: {
        loading
    },
    data: function() {
        return {
            isShowLoading: false,
            objModel: {
                Id: 0,
                Name: "",
                DateCreated: (new Date()).getFullYear() + "-" + String((new Date()).getMonth() + 1).padStart(2, '0') + "-" + String((new Date()).getDate()).padStart(2, '0'),
                Phone: "",
                Email: "",
            }
        }
    },
    validations: {
        objModel: {
            Email: { email },
            Name: { required, minLength: minLength(2) },
            DateCreated: { required },
            Phone: { isPhoneNumber },
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();
            console.log(this.$v.$invalid);
            if (this.$v.$invalid) {
                console.log("Invalid Form");
                return;
            }
            let self = this;
            this.isShowLoading = true;
            this.objModel.DateCreated = new Date(this.objModel.DateCreated);
            let promise = EmployerRepository.Add(this.objModel);
            promise
                .then(function(response) {
                    if (response.data != null){
                        alert("Employer successfully added");
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
        },
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

.employer_add section {
    padding: 10px 0;
}

.employer_add section.secPlusInfo {
    width: 320px;
    margin: auto;
}

.employer_add section>div {
    display: inline-block;
}

.employer_add section>div.col1 {
    width: 100px;
}

.employer_add section>div.col1 img {
    max-width: 70%;
    border-radius: 50%;
    vertical-align: top;
}

.employer_add section>div.col2 {
    width: 220px;
    text-align: left;
    vertical-align: top;
}

.employer_add input.emInput {
    width: 100%;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #008578;
    background-color: transparent;
    padding: 3px 1px;
}
    .employer_add input.emInput.txtError {
        border-bottom: 1px solid red;
    }

.employer_add .grInput i {
    display: inline-block;
    width: 30px;
    vertical-align: sub;
    color: #039789;
}

.employer_add .grInput input.emInput {
    display: inline-block;
    width: 288px;
}

.employer_add .addLblError{
    font-size: 0.8em;
    color: red;
    display: block;
    margin: -6px 0 5px;
}
</style>