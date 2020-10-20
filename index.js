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
                      css
                      javascript
                    }
                  }`            
            }
        })
        .then(function (result) {
            app.homePage = result.data.data.homePage;
            document.title = 'Umbraco CMS - ' + app.homePage.name;

            if(app.homePage.css){
              var style=document.createElement('style');
              style.type = 'text/css';
              style.appendChild(document.createTextNode(app.homePage.css));
              document.head.appendChild(style);
            }

            if(app.homePage.javascript){
              var script=document.createElement('script');
              script.type = 'text/javascript';
              script.appendChild(document.createTextNode(app.homePage.javascript));
              document.head.appendChild(script);
              loadComplete();
            }

            console.log(app.homePage);
        });
    }
  })