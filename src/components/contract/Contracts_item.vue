<template>
    <router-link :to="{ name: 'contractsedit', params: { id: this.Model.id }}" class="contractItem" v-if="this.Model != null">
        <div class="cta_row1">
            <p class="pName">{{ Model.contractId }} - {{ this.Model.customer_Name }}</p>
        </div>
        <div class="cta_row2">
            <div class="cta_col1">
                <p class="cta_sub">Ngày tạo</p>
                <p class="cta_vl">{{ this.Model.dateCreated }}</p>
            </div>
            <div class="cta_col2">
                <p class="cta_sub">Nhân viên</p>
                <p class="cta_vl">{{ this.Model.userName }}</p>
            </div>
            <div class="cta_col2">
                <p class="cta_sub">NFYP</p>
                <p class="cta_vl">{{ parseInt(this.Model.nfyp).toLocaleString() + " ₫" }}</p>
            </div>
            <!--<div class="cta_col2">
        <p class="cta_sub">RFYP</p>
        <p class="cta_vl">{{ parseInt(this.Model.rfyp).toLocaleString() + " ₫" }}</p>
    </div>-->
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            Model: {
                type: Object,
                default: null
            }
        },
        data: function () {
            return {
            }
        },
        mounted: function () {
        }
    }
</script>

<style>
    .contractItem {
        display: block;
        padding: 15px 15px 10px;
        background: #fff;
        margin: 10px auto;
        border-radius: 4px;
        /*box-shadow: 0px 0px 4px rgba(0,0,0,0.5);*/
        max-width: 640px;
    }

        .contractItem:first-child {
            margin-top: 0;
        }

        .contractItem > div {
            display: block;
            text-align: left;
        }

        .contractItem .cta_row1 i {
            font-size: 2em;
            vertical-align: middle;
            font-weight: normal;
        }

        .contractItem .cta_row1 .pName {
            display: inline-block;
            font-weight: bold;
            font-size: 1.2em;
        }


        .contractItem > div.cta_row2 {
            padding: 10px 0 5px;
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            display:flex;
        }

            .contractItem > div.cta_row2 > div {
                display: inline-block;
                padding: 6px 16px 0 0;
                flex: 1;    
            }

            .contractItem > div.cta_row2 .cta_sub {
                color: #5b5b5b;
                font-size: 1em;
            }

            .contractItem > div.cta_row2 .cta_vl {
                color: #333;
                font-size: 1.1em;
                margin-top: 5px;
            }
</style>