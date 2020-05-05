export const mixin = {
    computed: {
        alert_message() {
          return this.$store.getters.alert_message
        }
      },

    watch: {
        alert_message(value){
          const self = this;
          this.showToastBotttom(value)
          setTimeout(()=>{
            self.$store.commit('setAlertMessage', null)
          })
        }
    },
    methods: {
        
        showToastBotttom(text) {
            const self = this;
            // Create Toast
            if(!self.toastBottom || self.toastBottom.destroyed) {
              self.toastBottom = self.$f7.toast.create({
                text: text,
                closeTimeout: 2000,
                destroyOnClose: true,
              });
            }
            // Open it
            self.toastBottom.open();
          }
    }
      
}