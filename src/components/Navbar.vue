<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ user }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <button class="nav-link active customBtn" aria-current="page" @click="signout()">Sign Out</button>
        </ul>
        </div>
    </div>
</nav>
</template>

<script>
import { projectAuth, projectFirestore } from '../../Firebase/config.js'
import { useRouter} from 'vue-router'
import { ref } from 'vue'
export default {
    props : ['user'],
    setup(){
        
        const router = useRouter()
        const signout = ()=>{
            projectAuth.signOut()
            router.push({ name : 'Authentication'})
        }
        return { signout }
    }
}
</script>

<style scoped>
.customBtn{
    background-color: transparent;
    border: none;
}
.customBtn:hover{
    color: red;
    transition: all 0.3s ease;
}
</style>