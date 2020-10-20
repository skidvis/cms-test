var app = new Vue({
    el: '#app',
    data: {
      homePage: {}      
    }, 
    created: function(){
        console.log("mounted");
        axios({
            method: 'post',
            url: 'https://graphql.umbraco.io',
            headers: {'umb-project-alias':'vis-bu-demo', 'Content-Type': 'application/json'},
            data:{
                query:`{
                    homePage(url: "/awesome-page/") {
                      name
                      subheading
                      mainText
                      subText
                      heroImage{
                          url
                      }
                    }
                  }`            
            }
        })
        .then(function (result) {
            app.homePage = result.data.data.homePage;
            document.title = 'Umbraco CMS - ' + app.homePage.name;
        });
    }
  })