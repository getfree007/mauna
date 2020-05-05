<template>
<f7-app :params="f7params" >

  <!-- Left panel with cover effect-->
  <f7-panel left cover >
    <f7-view>
      <f7-page>
        <!--Profile Picture-->
        <div class="wrapper">
          <img class="image--cover" :src="photo_url" alt="">
        </div>
        <f7-block style="text-align:center;">{{display_name}}</f7-block>
        
        <f7-list>
          <f7-list-item link="/" view=".view-main" panel-close title="Home"></f7-list-item>
          <f7-list-item link="/editProfile/" view=".view-main" panel-close title="Perfil"></f7-list-item>
          <f7-list-item @click="signOut" view=".view-main" panel-close title="Logout"></f7-list-item>
          
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-panel>

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas" v-if="signed_in">
    <!-- Tabbar for switching views-tabs -->

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main tab tab-active url="/"></f7-view>


    <!-- Settings View -->
    <f7-view id="view-settings" name="Perfil" tab url="/editProfile/"></f7-view>

  </f7-views>

  <!-- If it's not Signed In yet -->
  <f7-view v-if="!signed_in" url="/signin/" :main="true"></f7-view>


  <f7-login-screen id="my-login-screen">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign In" @click="alertLoginData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>
</f7-app>
</template>
<script>

  import firebase from 'firebase';
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCvJb1ITJx_COT_TfBgVWQBs5YjyZCgIJQ",
    authDomain: "mauna-83858.firebaseapp.com",
    databaseURL: "https://mauna-83858.firebaseio.com",
    projectId: "mauna-83858",
    storageBucket: "mauna-83858.appspot.com",
    messagingSenderId: "983222297552",
    appId: "1:983222297552:web:52ffb6ff3379dbc1604fd5",
    measurementId: "G-LXG5QNJDSR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.whatchat', // App bundle ID
          name: 'Mauna', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {

              // Demo products for Catalog section
              products: [
                {
                  id: '1',
                  title: 'Apple iPhone 8',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                },
                {
                  id: '2',
                  title: 'Apple iPhone 8 Plus',
                  description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                },
                {
                  id: '3',
                  title: 'Apple iPhone X',
                  description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                },
              ]
            };
          },

          // App routes
          routes: routes,


          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },

        // Login screen data
        username: '',
        password: '',
      }
    },
    //Created for Sign In function
    computed: {
      show_tabbar() {
        return this.$store.getters.show_tabbar
      },
      signed_in() {
        return this.$store.getters.signed_in
      },
      photo_url() {
        return this.$store.getters.photo_url
      },
      display_name() {
        return this.$store.getters.display_name
      },
      gotoHome()
      {
        this.$f7router.navigate('/home/')
      }
    },

    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
          this.$f7.loginScreen.close();
        });
      },
      signOut() {
        const app = this.$f7
        this.$store.dispatch('signOut')
        app.panel.close()
      },
    },   

    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    }
  }
</script>

<!--Style for Profile Picture and Display Name-->

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