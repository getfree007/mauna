<template>
  <f7-page name="signup">
    <f7-navbar >
      <f7-nav-left>
        <f7-link icon="icon-back" href="/signin/" ></f7-link>
        Cadastro
      </f7-nav-left>
    </f7-navbar>
    <div class="wrapper">
        <img class="image--cover" :src="image_url" alt="" @click="launchFilePicker">
    </div>
<div class="list no-hairlines-md">
  <ul>
    <li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">Name</div>
        <div class="item-input-wrap">
          <input :value="name" @input="name=$event.target.value" type="text" placeholder="Seu nome">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
    <li class="item-content item-input">
      
      <div class="item-inner">
        <div class="item-title item-label">E-mail</div>
        <div class="item-input-wrap">
          <input  :value="email" @input="email=$event.target.value" type="email" placeholder="Your e-mail">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
    <li class="item-content item-input">
      
      <div class="item-inner">
        <div class="item-title item-label">Password</div>
        <div class="item-input-wrap">
          <input :value="password" @input="password=$event.target.value" type="password" placeholder="Your password">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
  </ul>
</div>
<f7-block>
    <div style="text-align:center;">
        <f7-button fill color="blue" outline @click="signUp">Cadastrar</f7-button>
        <input type="file" ref="file" style="display:none;" @change="onFilePicked"> 
    </div> 
</f7-block>
  </f7-page>
</template>

<script>


import {mixin} from '../../js/mixin'
export default {
    mixins: [mixin],

    data() {
        return {
            name:null,
            email:null,
            password: null,
            
        }
    },

    computed: {
      image_url() {
        return this.$store.getters.image_url
      },
      files() {
        return this.$store.getters.files
      },
      signed_up() {
        return this.$store.getters.signed_up
      }
    },

    watch: {
      signed_up(value) {
        if(value==true) {
          this.$f7router.navigate('/signin/')
        }
      } 
    },

    methods: {
      launchFilePicker() {
        this.$refs.file.click()
      },
      onFilePicked() {
        // Read the image File
        this.$store.dispatch('readFile','setImageURL')
    },

    signUp() {
      const self = this
      var payload = {}
        payload.name = this.name
        payload.email = this.email
        payload.password = this.password
        payload.photoURL = this.image_url
        if(self.files) {
          self.$store.dispatch('uploadFile','profile/').then(url=>{
            payload.photoURL = url
            self.$store.dispatch('signUp',payload)
          })
        } else {
            this.$store.dispatch('signUp',payload)
          }        
      },
      created() {
      this.$store.commit('signUp',payload)
      }
    },

    
    
    
}
</script>

<style scoped>
    .wrapper {
        text-align:center;
    }
    .image--cover {
        width:150px;
        height:150px;
        border-radius: 50%;
        margin:20px;
        object-fit:cover;
        object-position: center;
    }

</style>