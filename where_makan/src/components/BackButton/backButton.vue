<template>
    <div>
        <button @click="goBack">
                <div class="icon-container" style="display: flex; align-items: center;">
                    <Icon icon="carbon:previous-filled" style="font-size: 2rem;margin-top: 20px;" />
                    <span class="h4" style="margin-top: 25px; margin-left: 5px;">Go back</span>
                </div>
            </button>
    </div>
</template>

<script>

import { Icon } from '@iconify/vue';
export default {
    components:{
        Icon,
    },
    data() {
        
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    }
};
</script>

<style>
.icon-container:hover{
    color: red;
  }
</style>
