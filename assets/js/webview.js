const LINK = "https://fansly.com/hikkimyra/t7";


// проверяем только вход из приложения
function isInAppBrowser(){

    const ua = navigator.userAgent || "";

    return (
        /Instagram/i.test(ua) ||
        /FBAN|FBAV/i.test(ua) ||
        /TikTok/i.test(ua) ||
        /musical/i.test(ua) ||

        // android webview
        (/Android/i.test(ua) && /wv/i.test(ua)) ||

        // ios webview
        (/iPhone|iPad|iPod/i.test(ua) &&
        /AppleWebKit/i.test(ua) &&
        !/Safari/i.test(ua))
    );

}



function showWarning(){


    const browserUrl =
    window.location.href.split("?")[0] + "?browser=1";


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
    Choose "Open in browser"
    </p>


    <img 
    src="assets/gif/1.gif"
    style="
    width:300px;
    max-width:90%;
    ">


    <br><br>


    <a href="${browserUrl}"
    style="
    font-size:20px;
    color:blue;
    ">
    Open browser
    </a>


    </div>

    `;

}




function start(){


    // если это уже браузер после кнопки
    if(
        window.location.search.includes("browser=1")
    ){

        window.location.replace(LINK);

        return;

    }



    if(isInAppBrowser()){


        showWarning();


        return;

    }



    // обычный браузер

    window.location.replace(LINK);


}



start();