<template> 
  <router-view/>
  <div v-if="isPending">
      <Spinner/>
  </div>
  <div v-else>
      <div id="body-wrap">
    <div class="row">
        <div class="col-md-4 px-0 theme-dark text-center text-md-start">
            <div class="container px-5">
                <h2>Application</h2>
                <h2>Login Page</h2>
                <p class="mt-3">Login or Register from here to access</p>
            </div>
            >
        </div>
        <div class="col-md-8 component">
            <div v-if="!choice">
                <!--Show Login Page-->
                <h4 class="font-primary mb-4">Log In</h4>
                <form @submit.prevent="signIn()">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="someone@something.com" class="form-control mb-3" v-model="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Your Password Here" class="form-control mb-3" v-model="loginPassword" required>
                    </div>
                    <div v-if="loginError" class="text-danger">{{ loginError }}</div>
                    <div class="form-group mt-3">
                        <button class="btn btn-dark" v-if="!isPending">Log In</button>
                    </div>
                </form>
                <div class="register-info mt-5">
                    <h5>Not a member yet? <span><button class="registerLink" @click="choice=!choice">Register</button></span></h5>
                </div>
            </div>
            <!--Else show Register Page-->
            <div v-else>
                <h4 class="font-primary mb-4">Register</h4>
                <form @submit.prevent="signUp()">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control mb-3" placeholder="You Name" v-model="sName">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control mb-3" placeholder="someone@jft.com" v-model="sEmail">
                    </div>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" class="form-control mb-3" placeholder="Username1234" v-model="sUsername">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control mb-3" placeholder="Your Password" v-model="sPassword">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" class="form-control mb-3" placeholder="Re-enter Password" v-model="sPass">
                    </div>
                    <div v-if="loginError" class="text-danger my-2">{{ loginError }}</div>
                    <div class="form-group">
                        <button class="btn btn-dark">Sign Up</button>
                    </div>
                </form>
                <div class="register-info mt-5">
                    <h5>Already a member? <span><button class="registerLink" @click="choice=!choice">Log In</button></span></h5>
                </div>
            </div>
        </div>
    </div>
</div>
  </div>

</template>
<script>
import { ref } from 'vue'
import { useRouter} from 'vue-router'
import Spinner from '../components/Spinner.vue'
// import { router } from 'vue-router'
import { projectAuth, projectFirestore } from '../../Firebase/config'
export default {
  components : { Spinner },
  setup(){
    const choice = ref(false)
    // False => Show Login Page

    //Routing
    const router = useRouter()

    //Declare SignUp and Login Variables

    const loginEmail = ref('')
    const loginPassword = ref('')

    const sEmail = ref('')
    const sName = ref('')
    const sUsername = ref('')
    const sPassword = ref('')
    const sPass = ref('')

    // UI UX Elements
    const loginError = ref('')
    const isPending = ref(false)
    // Functions
    const signIn = ()=>{
        isPending.value = true
        projectAuth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
        .then(userCred=>{
            loginError.value = ''
            console.log(userCred.user)
            isPending.value = false
            router.push({ name : 'Home' })
        })
        .catch(error=>{
            loginError.value = error.message
            console.log(error)
            isPending.value = false
        })
    }
    const signUp = async ()=>{
        let data
        if(sPassword.value === sPass.value){
            const res = await projectAuth.createUserWithEmailAndPassword(sEmail.value, sPassword.value)
            let data = {
                name: sName.value,
                email : sEmail.value,
                username : sUsername.value,
                id : res.user.uid,
                admin : false
            }
            projectFirestore.collection('users').add(data)
        }else{
            loginError.value = 'Password mismatch'
        }
    }
    

    return { choice, loginEmail, loginPassword, sEmail, sName, sUsername, sPassword, sPass, signIn, signUp, loginError, isPending }
  }
}
</script>

<style scoped>
    #body-wrap{
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    .row{
        height: 100%;
    }
    .theme-dark{
        background-color: #111;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .component{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    form{
        max-width: 50%;
    }
    .registerLink{
        padding: 5px 5px;
        background-color: transparent;
        border: none;
        color: var(--primary);
        cursor: pointer;
    }
    .font-primary{
        color: var(--primary);
    }
    @media(max-width:768px){
        .component{
            justify-content: center;
        }
        form{
            max-width: 90%;
            margin: auto;
        }
        .register-info{
            text-align:center;
        }
        h4{
            text-align: center;
        }
        #body-wrap{
            height: 130vh;
        }
    }
</style>
