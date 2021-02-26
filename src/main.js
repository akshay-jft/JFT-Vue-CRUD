import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from '../Firebase/config.js'
// Bootstrap Javascript CDN
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"></link>

let app

projectAuth.onAuthStateChanged(()=>{
    if(!app){
        app = createApp(App).use(router).mount('#app')
    }
})
