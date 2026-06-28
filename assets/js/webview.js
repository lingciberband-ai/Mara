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

  // если уже был открыт внешний браузер — не блокируем
  if (sessionStorage.getItem("opened_browser")) {
    return false;
  }


  const instagram =
    /Instagram/i.test(ua) ||
    /FBAN|FBAV/i.test(ua);


  const android =
    /Android/i.test(ua) &&
    (/wv/i.test(ua) || !/Chrome/i.test(ua));


  const ios =
    /iPhone|iPad|iPod/i.test(ua) &&
    /AppleWebKit/i.test(ua) &&
    !/Safari/i.test(ua);


  return instagram || android || ios;

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


  sessionStorage.setItem("opened_browser","1");


  document.body.innerHTML = `

  <div style="
  padding:30px;
  text-align:center;
  font-family:Arial;
  ">


  <h2>
  Open in browser
  </h2>


  <p>
  Tap ⋮ or ⋯ above<br>
  and choose "Open in browser"
  </p>


  <img 
  src="assets/gif/1.gif"
  style="width:80%;max-width:300px;"
  >


  </div>

  `;


}





function redirect() {

  console.log("UA:", navigator.userAgent);
  console.log("REF:", document.referrer);
  console.log("WV:", isWebView());


  if (isWebView()) {

    showWebViewWarning();

    return false;

  }


  window.location.href = getLink();

}

window.addEventListener("load", ()=>{

  redirect();

});