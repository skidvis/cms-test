var app = new Vue({
    el: '#app',
    data: {
      homePage: {},    
      passedId: '70JtZPJfI5sEt52uNitY8r'
    }, 
    created: function(){
        if(window.location.search.includes('=')) this.passedId = window.location.search.split('=')[1];
        let self = this;
        axios({
            method: 'post',
            url: 'https://graphql.contentful.com/content/v1/spaces/x9xb4r349pvz',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer sAS2Gng5fza4279fpKeIZgOORw6LR6cps6vz1EMyzN0"
            },
            data:{
                query:`query{
                  homePage(id:"${self.passedId}"){
                      name
                      subHeading
                      mainText{json}
                      subText{json}
                      heroImage{url}
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
              //document.head.appendChild(script);
              //loadComplete();
            }

            console.log(app.homePage);
        });
    }
  })