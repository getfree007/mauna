import firebase from 'firebase';

const AuthModule = {
    state: {
        signed_in: false,
        signed_up: false,
        show_resend_email: false,
        photo_url: null,
        display_name: null
    },

    getters: {
        signed_in: state=>state.signed_in,
        signed_up: state=>state.signed_up,
        show_resend_email: state=>state.show_resend_email ,
        photo_url: state=>state.photo_url,
        display_name: state=>state.display_name 
    },

    mutations: {
        setSignIn(state,payload) {
            state.signed_in = payload;
        },
        setSignedUp(state,payload) {
            state.signed_up = payload;
        },
        setShowResendEmail(state,payload) {
            state.show_resend_email = payload;
        },
        setPhotoURL(state,payload) {
            state.photo_url = payload;
        },
        setDisplayName(state,payload) {
            state.display_name = payload;
        }
    },

    actions: {
        signIn({commit},payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user=>{
                // Already Logged In

                firebase.auth().onAuthStateChanged(function(user) {
                    if(user!=null) {
                        //Authentication by email
                        if (user.emailVerified) {
                        // User is signed in.
                        commit('setAlertMessage',`Bem vindo ${user.displayName}`);
                        
                        commit('setSignIn',true);
                        commit("setShowResendEmail",false)
  
                      } else {
                        // No user is signed in.
                        commit('setSignIn',false);
                        commit('setAlertMessage',"Por favor verifique a conta com seu email!");
                        commit("setShowResendEmail",true)
                      }
                    } else {
                        return
                    }
                    
                })
            })
            .catch(function(error) {
                // Handle Errors here.
                commit('setAlertMessage',error)
                
                // ...
              });
        },

        signUp({commit, dispatch},payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then(data=>{
                firebase.database().ref("users").child(data.user.uid).set({
                    uid: data.user.uid,
                    name: payload.name,
                    email: payload.email,
                    emailverified: false,
                    photo_url: payload.photoURL
                })
                let newuser = data.user;
                newuser.updateProfile({
                    displayName: payload.name,
                    photoURL: payload.photoURL
                })
                .then(()=>{
                    dispatch('sendVerification')
                    commit('setSignedUp', true)
                    
                }).catch(err=>{
                    
                    commit('setAlertMessage', err.message);
                })
            }).catch(err=>{
                
                commit('setAlertMessage', err.message);
            })
        },

        signOut({commit}) {
            firebase.auth().signOut().then(()=>{
                commit('setSignIn',false)
            })
        },

        sendVerification({commit}) {
            var user = firebase.auth().currentUser;

            user
            .sendEmailVerification()
            .then(function() {
                // Email sent.
                commit('setAlertMessage',`A verificação de email foi enviada para ${user.email}`)
            })
            .catch(function(error) {
                // An error happened.
            });
        }
    }
}

export default AuthModule