<template>
    <div class="employer_add">
        <h1 class="titleE"><i class="fa fa-chevron-left" @click="$router.go(-1)"></i> Thêm nhân viên mới</h1>
        <form @submit.prevent="handleSubmit">
            <section>
                <div class="col1">
                    <img src="@/assets/img/employer.png" />
                </div>
            </section>
            <section class="secPlusInfo">
                <div class="grInput">
                    <i class="fa fa-user"></i>
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.Name.required}" v-model="objModel.Name" placeholder="Họ tên nhân viên" required>
                </div>
                <div class="grInput">
                    <i class="fa fa-phone-alt"></i>
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.Phone.isPhoneNumber}" v-model="objModel.Phone" placeholder="Phone">
                    <span v-if="!$v.objModel.Phone.isPhoneNumber" class="addLblError">Số điện thoại không hợp lệ</span>
                </div>
                <div class="grInput">
                    <i class="fa fa-envelope"></i>
                    <input class="emInput" :class="{'txtError': !this.$v.objModel.Email.email}" v-model="objModel.Email" type="Email" placeholder="Email">
                    <span v-if="!$v.objModel.Email.email" class="addLblError">Email không hợp lệ</span>
                </div>
            </section>
            <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
            <button class="btnActionContract"><i class="fa fa-save"></i> Lưu</button>
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
            //DateCreated: { required },
            Phone: { isPhoneNumber },
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            let self = this;
            this.isShowLoading = true;
            //this.objModel.DateCreated = new Date(this.objModel.DateCreated);
            let promise = EmployerRepository.Add(this.objModel);
            promise
                .then(function(response) {
                    if (response.data != null) {
                        self.$modal.show('dialog', {
                                title: '',
                                text: 'Lưu thông tin thành công!',
                                buttons: [
                                    {
                                        title: 'Đóng',
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
                .catch(function() {
                    alert("An error occurred, please try again later.");
                    //if (error.response.status === 401)
                    //    self.$router.push("/login");
                })
                .finally(function() {
                    self.isShowLoading = false;
                })
        },
    },
}
</script>

<style>
.employer_add .titleE {
    margin-bottom: 15px;
}

.employer_add .titleE i {
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