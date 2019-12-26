<template>
    <div class="ld">
        <div :class="themeName"></div>
    </div>
</template>
<script>
    export default {
        props: {
            themeName: {
                type: String,
                default: "lds-dual-ring"
            }
        }
    }
</script>
<style>
    .ld {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lds-hourglass {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }

        .lds-hourglass:after {
            content: " ";
            display: block;
            border-radius: 50%;
            width: 0;
            height: 0;
            margin: 8px;
            box-sizing: border-box;
            border: 32px solid #fff;
            border-color: #fff transparent #fff transparent;
            animation: lds-hourglass 1.2s infinite;
        }

    @keyframes lds-hourglass {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }

        50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        100% {
            transform: rotate(1800deg);
        }
    }

    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
    }

        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid rgba(0,0,0,0.2);
            border-color: rgba(0,0,0,0.2) transparent rgba(0,0,0,0.2) transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>