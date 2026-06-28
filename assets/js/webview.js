const LINK = "https://fansly.com/hikkimyra/t7";


// проверяем только реальный встроенный браузер
function isInAppBrowser(){

    const ua = navigator.userAgent || "";


    // Android WebView
    if(
        /Android/i.test(ua) &&
        /wv/i.test(ua)
    ){
        return true;
    }


    // iOS WebView
    if(
        /iPhone|iPad|iPod/i.test(ua) &&
        /AppleWebKit/i.test(ua) &&
        !/Safari/i.test(ua)
    ){
        return true;
    }


    // Instagram/Facebook внутри приложения
    if(
        /Instagram/i.test(ua) &&
        !/Chrome/i.test(ua)
    ){
        return true;
    }


    if(
        /FBAN|FBAV/i.test(ua)
    ){
        return true;
    }


    return false;

}



function showWarning(){

document.body.innerHTML = `

<div style="
text-align:center;
padding:30px;
font-family:Arial;
">


<h2>
Open in browser
</h2>


<p>
Tap ⋯ above<br>
Select "Open in browser"
</p>


<img 
src="assets/gif/1.gif"
style="width:300px;max-width:90%"
>


</div>

`;

}




function start(){


console.log("UA:", navigator.userAgent);


const webview = isInAppBrowser();


console.log("WEBVIEW:", webview);



if(webview){

    showWarning();

    return;

}


// только обычный браузер

window.location.replace(LINK);


}



start();