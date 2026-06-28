const LINK = "https://fansly.com/hikkimyra/t7";


function isInstagramWebView(){

    const ref = document.referrer || "";

    return (
        ref.includes("instagram.com") ||
        ref.includes("l.instagram.com")
    );

}



function hasOpenedBrowser(){

    return document.cookie.includes("opened_browser=1");

}



function setOpenedBrowser(){

    document.cookie =
    "opened_browser=1; max-age=600; path=/";

}



function showWarning(){

    setOpenedBrowser();


    document.body.innerHTML = `

    <div style="
        text-align:center;
        padding:40px;
        font-family:Arial;
    ">

        <h2>Open in browser</h2>

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

    </div>

    `;

}




function start(){


    console.log("UA:", navigator.userAgent);

    console.log("REF:", document.referrer);


    // первый заход из Instagram
    if(
        isInstagramWebView() &&
        !hasOpenedBrowser()
    ){

        showWarning();

        return;

    }


    // обычный браузер

    window.location.replace(LINK);

}



start();