<template>
    <div class="box">
        <div class="row justify-content-center">
            <div class="col-md-6 p-4 shadow">
                <h2 class="py-3 font-primary text-center">Jellyfish Technology</h2>
                <form class="mt-5">
                    <div class="form-group mb-3">
                        <label>Email</label>
                        <input type="email" placeholder="Email" class="form-control" v-model="email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" class="form-control" v-model="password">
                    </div>
                </form>
                <p v-if="status" class="my-2 text-danger">{{ status }}</p>
                <div class="text-center mt-5">
                    <button class="signInBtn" @click="signIn()" v-if="!pending">Sign In</button>
                    <p class="mt-5">Not a member Yet ? <span><a href="#" class="registerLink">Sign Up</a> </span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import {projectAuth, projectFirestore} from '../../Firebase/config.js'
export default {
    setup(){
        const email = ref('')
        const password = ref('')
        let status = ref('')
        let pending = ref(false)
        const signIn = ()=>{
            pending.value = true
            projectAuth.signInWithEmailAndPassword(email.value,password.value)
                .then(user=>{
                    console.log(user)
                    status.value=''
                    pending.value = false
                })
                .catch(error=>{
                    status.value = error.message
                    pending.value =false
                })
        }

        return { email, password, signIn, status, pending}
    }
}
</script>

<style scoped>
    .box{
        width: 70%;
        margin: auto;
        margin-top: 20vh;
    }
    .test{
        border: 1px solid red;
    }
    .register{
        padding: 10px 40px;
        border: 1px solid white;
        background-color: transparent;
        color: white;
    }
    .font-primary{
        color: var(--primary);
    }
    .signInBtn{
        padding: 10px 40px;
        border: none;
        background-color: var(--primary);
        color: white;
        border-radius: 5px;
        transition: all 0.4s ease;
        border: 1px solid white;
    }
    .signInBtn:hover{
        color: var(--primary);
        background-color: white;
        border:1px solid var(--primary);
        transition: all 0.4s ease;
    }
    .registerLink{
        color: var(--primary);
        text-decoration: none;
        cursor: pointer;
    }
    input{
        outline: none;
        border: none;
        border-bottom: 1px solid #f6f6f6;
        margin-top: 10px;
        padding: 0;
    }
    input:focus{
        outline: none;
    }
    @media(max-width:768px){
        .box{
            width: 90%;
            margin-top: 30%;
        }
        
    }
</style>