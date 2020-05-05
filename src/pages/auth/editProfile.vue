<template>
  <f7-page name="editProfile">
    <f7-navbar >
      <f7-nav-left>
        <f7-link icon="icon-back" href="/" ></f7-link>
      </f7-nav-left>
      Editar Perfil
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
          <input :value="display_name" @input="display_name=$event.target.value" type="text" placeholder="Seu nome">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>
    
  </ul>
</div>
<f7-block>
    <div style="text-align:center;">
        <f7-button outline @click="updateProfile">Editar Perfil</f7-button>
        <input type="file" ref="file" style="display:none;" @change="onFilePicked"> 
    </div> 
</f7-block>

  </f7-page>
</template>

<script>
import {
  setTimeout
} from 'timers';

import {mixin} from '../../js/mixin'
import firebase from 'firebase'

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
      display_name: {
          get: function() {
            return this.$store.getters.display_name
          },
          set: function(newValue) {
              this.$store.commit('setDisplayName',newValue)
          }
      },
      image_url() {
        return this.$store.getters.image_url
      },
      files() {
        return this.$store.getters.files
      },
      photo_url() {
          return this.$store.getters.photo_url
      }
    },

    watch: {
      
    },

    methods: {
      launchFilePicker() {
        this.$refs.file.click()
      },
      onFilePicked() {
        // Read the image File
        this.$store.dispatch('readFile','setImageURL')
      },
      //Function to Update Profile Picture and Name
      updateProfile() {
        const self = this;
        
        if(self.files) {
            //Find the current User to Update info
            var user = firebase.auth().currentUser;

            if(this.photo_url!=null) {
                var storage = firebase.storage();
                var httpReference = storage.refFromURL(this.photo_url);
                httpReference.delete().then(()=>{
                    
                }).catch(err=>{
                    console.log(err)
                })
            }
            self.$store.dispatch('uploadFile','profile/').then(url=> {
                
                user.updateProfile({
                    displayName: self.display_name,
                    photoURL: url
                }).then(function() {
                    self.$store.commit('setPhotoURL',user.photoURL);
                    self.$store.commit('setDisplayName',user.displayName);

                    firebase.database().ref('users/'+user.uid).update({
                        photo_url:user.photoURl,
                        name: user.displayName
                    })

                }).catch(err=>{
                    console.log(err)
                })
            })
        } else {
            user.updateProfile({
                displayName:self.display_name,
            }).then(function(){
                self.$store.commit('setDisplayName',user.displayName)
            })
        }        
      },      
    },
    
    created() {
      if(this.photo_url != null) {
          this.$store.commit('setImageURL',this.photo_url)
      }
    }
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