var app = new Vue({
    el: '#app',
    data: {
      subheading: null,
      mainText: null, 
      subText: null,
      imageUrl: null,
      title: null
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
            var content = result.data.data.homePage;
            app.subheading = content.subheading;
            app.mainText = content.mainText;
            app.subText = content.subText;
            app.imageUrl = content.heroImage.url;
            app.title = content.name;
            document.title = 'Umbraco CMS - ' + content.name;
        });
    }
  })