// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Vuelayers

import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader
import { Geoloc } from 'vuelayers';
Vue.use(Geoloc)
Vue.use(VueLayers)

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';
import store from "../pages/store/store.js";
import firebase from 'firebase';
//Using the Asyng Await
import lodash from 'lodash';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue,lodash);

let newapp = null
// Verified if user is signed in
firebase.auth().onAuthStateChanged(function(user) {

  if (user && user.emailVerified) {
    // User is signed in.
    store.commit('setSignIn',true)
    store.commit('setDisplayName',user.displayName)
    store.commit('setPhotoURL',user.photoURL)

  } else {
    // No user is signed in.
    store.commit('setSignIn',false)
  }

  if(!newapp) {
    // Init App
    newapp = 
    new Vue({
      el: '#app',
      render: (h) => h(App),
      store,
      // Register App Component
      components: {
        app: App
      },
    });
  }
});

