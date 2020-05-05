<template>
  <f7-page class="page-color" name="signin">
    <f7-navbar class="nav" title="Login" >
    </f7-navbar>
    <div class="wrapper">
        <img src="static/LOGO_MAUNA.png" class="image--cover">
    </div>
<div class="list no-hairlines-md">
  <ul>
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
    <div class="button-color">
    <f7-button fill color="blue" outline @click="signIn">Login</f7-button>
    <br>
    <f7-link v-if="show_resend_email" @click="resendEmail" :color="color(time_left)">Reenviar Email de Confirmação<span v-if="time_left>0"></span></f7-link><br>
    <f7-link color="blue" href="/signup/">Não tem uma conta? Cadastrar</f7-link><br>
    <f7-link color="blue" @click="forgetPassword">Esqueci minha senha</f7-link><br>
    </div> 
</f7-block>
<f7-block-footer class="footer-page">Termo de Política e Privacidade</f7-block-footer>
  </f7-page>
</template>

<script>

import {
  setTimeout
} from 'timers';

import {mixin} from '../../js/mixin'
import firebase from 'firebase'
export default {
    data() {
        return {
            email:null,
            password: null,
            time_left: -1
        }
    },
    mixins: [mixin],

    computed: {
        show_resend_email() {
          return this.$store.getters.show_resend_email
        }
    },

    methods: {
      //Resend email verification changed color when pressed
      color(time_left) {
        if(time_left<=0) {
          return '#007aff'
        } else {
          return 'gray'
        }
      },

      signIn() {
        var payload = {}
        payload.email = this.email
        payload.password = this.password

        this.$store.dispatch('signIn',payload)
      },

      resendEmail() {
        const self = this
        console.log('time_left', this.time_left)
        if(this.time_left <= 0) {
          this.$store.dispatch('sendVerification')
          self.countDown()
        }        
      },
      //Put a time to verified the email account
      countDown() {
        const self = this
        self.time_left = 20
        var time = setInterval(function(){
          console.log('time_left', self.time_left)
          self.time_left-=1
          if(self.time_left<=0) {
            clearInterval(timer)
          }
        },1000)
      },

      //Forget password method
      forgetPassword() {
        
        const self = this;
        var auth = firebase.auth();
        if(this.email != null) 
        {
          auth.sendPasswordResetEmail(this.email).then(function() {
            // Email sent.
            self.$store.commit('setAlertMessage',`Um email de mudança de senha foi enviado!`)
          }).catch(function(error) {
            // An error happened.
            self.$store.commit('setAlertMessage',error)
          });
        } else {
          self.$store.commit('setAlertMessage', `Por favor coloque seu email`)
        }        
      }

    }
}
</script>

<style scoped>
    .wrapper {  
        text-align:center;
    }
    .image--cover {
        filter: opacity(80%);
        filter:drop-shadow(40%);
        width:310px;
        height:170px;
        margin:20px;
        object-fit:cover;
        object-position: center;
    }

    .footer-page {
      margin-bottom: 0%;
      margin-top: 120px;
      text-align: center;
    }

    .button-color {
      
      text-align:center;
    }
    .nav title
    {
      text-align: center;
    }

</style>