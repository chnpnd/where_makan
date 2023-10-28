<template>
    <div>
        <input type="text" placeholder="Username" v-model="username"/>
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
        username = '',
        password = ''
    },
    methods:{
        submitForm()
        {
            console.log(`Form submitted! Username is ${this.username}`)
            console.log(`Form submitted! Password is ${pthis.password}`)
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