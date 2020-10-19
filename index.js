var app = new Vue({
    el: '#app',
    data: {
      message: null,
      imageUrl: null
    }, 
    created: function(){
        console.log("mounted");
        axios({
            method: 'post',
            url: 'https://graphql.umbraco.io',
            headers: {'umb-project-alias':'vis-s-amiable-turtle', 'Content-Type': 'application/json'},
            data:{
                query:`{
                    homePage(url: "/home/") {
                      welcomeText
                      heroImage{
                          url
                      }
                    }
                  }`            
            }
        })
        .then(function (result) {
            console.log(result.data.data.homePage.welcomeText);
            app.message = result.data.data.homePage.welcomeText;
            app.imageUrl = result.data.data.homePage.heroImage.url;
        });
    },
    methods:{
        doThis: function(text){
            this.message = text;
        }
    }
  })