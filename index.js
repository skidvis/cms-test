const App = {
    data(){
      return{
        homePage: null,    
        passedId: '3JEVspMLVgAahSY7hmpcpn',
        bear: 'sAS2Gng5fza4279fpKeIZgOORw6LR6cps6vz1EMyzN0'
      }
    }, 
    mounted(){
      this.doInit();
    },
    methods:{
      doInit(){
        if(window.location.search.includes('=')) this.passedId = window.location.search.split('=')[1];
        let self = this;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Authorization'] = 'Bearer ' + this.bear;

        axios.post('https://graphql.contentful.com/content/v1/spaces/x9xb4r349pvz', {
          query:`query{
            offering(id:"${self.passedId}", preview: true){
                title
                url
                cssStyles
                offeringType
              }
            }`
          })
        .then((result) => {
            console.log(result);
            this.homePage = result.data.data.homePage;
            document.title = `${window.location.host}:${this.homePage.name}`;
            console.log(this.homePage);
        })
        .catch((error) => {
          console.log(error);
        });        
      },
      jsonToHtml(string){
        console.log(string);
        return window.documentToHtmlString(string);
      }
    }
  };

  const vm = Vue.createApp(App);
  vm.mount('#app');