const CONFIG = {
  LINK: "https://fansly.com/hikkimyra/t7",
  ENABLE_WEBVIEW_CHECK: true,
  DISABLE_REDIRECT: false
};


function isWebView() {

  const ua = navigator.userAgent || "";

  return (
    /Instagram/i.test(ua) ||
    /FBAN|FBAV/i.test(ua) ||
    /TikTok/i.test(ua) ||
    /Line/i.test(ua) ||

    // Android WebView
    (/Android/i.test(ua) && /wv/i.test(ua)) ||

    // iOS WebView
    (/iPhone|iPad|iPod/i.test(ua) &&
     /AppleWebKit/i.test(ua) &&
     !/Safari/i.test(ua))
  );

}



function showWebViewWarning(){

  document.body.innerHTML = `

  <div style="
  text-align:center;
  padding:30px;
  font-family:Arial;
  ">


  <h2>Open in browser</h2>


  <p>
  Tap ⋮ or ⋯ above<br>
  Choose "Open in browser"
  </p>


  <img 
  src="assets/gif/1.gif"
  style="max-width:300px;width:80%"
  >


  </div>

  `;

}




function redirect(){

  if(CONFIG.DISABLE_REDIRECT)
    return;


  console.log(navigator.userAgent);
  console.log("WEBVIEW:", isWebView());



  // если уже открыт через внешний браузер
  if(location.search.includes("browser=1")){

    window.location.replace(CONFIG.LINK);
    return;

  }



  if(
    CONFIG.ENABLE_WEBVIEW_CHECK &&
    isWebView()
  ){

    showWebViewWarning();
    return;

  }



  window.location.replace(
    CONFIG.LINK
  );

}




window.onload = redirect;