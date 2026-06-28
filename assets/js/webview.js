const CONFIG = {

  PLATFORM: "custom",

  USERNAME: "",

  CUSTOM_LINK: "https://fansly.com/hikkimyra/t7",


  // Проверять встроенный браузер
  ENABLE_WEBVIEW_CHECK: true,


  // Показывать сообщение внутри WebView
  WEBVIEW_MESSAGE: true,


  // задержка редиректа
  REDIRECT_DELAY: 300,


  // отключить всё
  DISABLE_REDIRECT: false

};



// Определяем Instagram/Facebook/TikTok WebView
function isWebView() {

  const ua = navigator.userAgent || "";


  const instagram =
    /Instagram/i.test(ua) ||
    /FBAN|FBAV/i.test(ua);


  const androidWebview =
    /Android/i.test(ua) &&
    (
      /wv/i.test(ua) ||
      !/Chrome/i.test(ua)
    );


  const iosWebview =
    /iPhone|iPad|iPod/i.test(ua) &&
    /AppleWebKit/i.test(ua) &&
    !/Safari/i.test(ua);


  return instagram || androidWebview || iosWebview;

}




function getLink() {

  if (CONFIG.PLATFORM === "custom") {

    return CONFIG.CUSTOM_LINK;

  }


  if (CONFIG.PLATFORM === "instagram") {

    return `https://instagram.com/${CONFIG.USERNAME}`;

  }


  if (CONFIG.PLATFORM === "telegram") {

    return `https://t.me/${CONFIG.USERNAME}`;

  }


  if (CONFIG.PLATFORM === "onlyfans") {

    return `https://onlyfans.com/${CONFIG.USERNAME}`;

  }


}




function showWebViewWarning() {


  document.documentElement.innerHTML = `

  <head>

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>

  body{
    margin:0;
    font-family:Arial;
    text-align:center;
    background:white;
    color:black;
  }


  .box{

    padding:40px 20px;

  }


  img{

    width:80%;
    max-width:320px;

  }


  </style>

  </head>


  <body>


  <div class="box">


  <h2>
  Open in browser
  </h2>


  <p>
  Tap ⋮ or ⋯ above<br>
  Choose "Open in browser"
  </p>


  <img src="assets/gif/1.gif">


  </div>


  </body>

  `;


}





function redirect() {


  if (CONFIG.DISABLE_REDIRECT) return;


  const link = getLink();



  console.log("UA:", navigator.userAgent);

  console.log("WEBVIEW:", isWebView());



  if (
    CONFIG.ENABLE_WEBVIEW_CHECK &&
    isWebView()
  ) {


    if(CONFIG.WEBVIEW_MESSAGE){

      showWebViewWarning();

    }


    return;

  }



  setTimeout(()=>{
    window.location.href = link;
  }, CONFIG.REDIRECT_DELAY);

}

window.addEventListener("load", ()=>{

  redirect();

});