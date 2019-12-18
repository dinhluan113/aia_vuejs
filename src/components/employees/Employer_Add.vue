<template>
    <div class="employer_add">
        <h1 class="titleE"><i class="fa fa-chevron-left" @click="$router.go(-1)"></i> Add Employer</h1>
        <section>
            <div class="col1">    
                <img src="@/assets/img/employer.png" />    
            </div>    
            <div class="col2">    
                <input class="emInput" v-model="this.Model.Name" placeholder="add name" required>    
                <input class="emInput" v-model="this.Model.DateCreated" type="date" required>    
            </div>    
        </section>    
        <section class="secPlusInfo">    
            <div class="grInput">    
                <i class="fa fa-phone-alt"></i>    
                <input class="emInput" v-model="this.Model.Phone" placeholder="Phone">    
            </div>    
            <div class="grInput">    
                <i class="fa fa-envelope"></i>    
                <input class="emInput" v-model="this.Model.Email" type="Email" placeholder="Email">    
            </div>    
        </section>    
        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
        <a href="javascript:void(0)" @click="addEmployer()" class="btnAddEmployer"><i class="fa fa-save"></i></a>
    </div>
</template>
<script>
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
            Model: {
                Id: 0,
                Name: "",
                DateCreated: new Date(),
                Phone: "",
                Email: "",
            }
        }
    },
    methods: {
        addEmployer() {
            let self = this;
            this.isShowLoading = true;
            let promise = EmployerRepository.Add(this.Model);
            promise
                .then(function(response) {
                    if (response.data != null)
                        console.log(response);
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
</style>