<template>
  <Navbar user='Akshay' />
<div class="container-fluid">
  
    <!--If Data is Available-->
    <div v-if="data.length">
      <div class="clients shadow p-5">
        <div class="row clientRow py-3"> 
          <div class="col-3"><h6>Name</h6></div>
          <div class="col-3"><h6>Username</h6></div>
          <div class="col-3"><h6>Email</h6></div>
          <div class="col-3"><h6>Action</h6></div>
        </div>
        <div v-for="data in data" :key="data" class="row clientRow py-1">
          <div class="col-3"><p>{{ data.name }}</p></div>
          <div class="col-3"><p>{{ data.username }}</p> </div>
          <div class="col-3"><p>{{ data.email }}</p></div>
          <div class="col-3">
            <button class="btn btn-outline-success form-control">Edit</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
        <Spinner/>
    </div>

    
</div>
  
</template>

<script>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import { projectFirestore, projectAuth } from '../../Firebase/config'
export default {
    components: {Navbar, Spinner},
    setup(){
      let data = ref([])
      const isAdmin = ref(false)
      const load = async()=>{
        //Get Current user
        const cu = projectAuth.currentUser.uid
        const users = await projectFirestore.collection('users').get()
        users.forEach(item=>{
          let data = item.data()
        })
        const res = await projectFirestore.collection('data').get()
        data.value = res.docs.map(item=>{
          return { ...item.data() , id:item.id}
        })
      }
      load()


      return { data }
    }
    
}
</script>

<style scoped>
    .clientRow{
      border: 1px solid #e3e3e3;
      align-items: center;
    }
    .clientRow p{
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-top: 20px;
    }
</style>