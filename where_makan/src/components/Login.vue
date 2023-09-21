<template>
    <div>
        <input type="text" placeholder="Username" ref="name" v-model="name"/>
        <br>
        <input type="password" placeholder="Password" v-model="password"/>
        <div>
            <button @click="submitForm">Submit</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    data(){
        const name = ref('')
        const password = ref('')
    },
    methods:{
        submitForm()
        {
            console.log(`Form submitted! Username is ${name.value}`)
            console.log(`Form submitted! Password is ${password.value}`)
        }
    }
}
</script>

<style scoped>
    input
    {
        padding: 5px;
        margin-bottom: 2px;
    }

    button
    {
        margin-top: 20px;
    }
</style>