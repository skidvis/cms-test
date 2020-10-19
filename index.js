var app = new Vue({
    el: '#app',
    data: {
      message: null,
      imageUrl: null,
      title: null
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
                      name
                      welcomeText
                      heroImage{
                          url
                      }
                    }
                  }`            
            }
        })
        .then(function (result) {
            var content = result.data.data.homePage;
            app.message = content.welcomeText;
            app.imageUrl = content.heroImage.url;
            app.title = content.name;
            document.title = 'Umbraco CMS - ' + content.name;
        });
    }
  })