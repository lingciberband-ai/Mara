const LINK = "https://fansly.com/hikkimyra/t7";


function fromInstagram(){

    return (
        document.referrer.includes("instagram.com") ||
        document.referrer.includes("l.instagram.com")
    );

}



function showedWarning(){

    return localStorage.getItem("webview_warning") === "1";

}



function showWarning(){


    localStorage.setItem(
        "webview_warning",
        "1"
    );


    document.body.innerHTML = `

    <div style="
    text-align:center;
    padding:40px;
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
    style="width:300px;max-width:90%"
    >


    </div>

    `;

}




function start(){


    console.log("REF:", document.referrer);
    console.log("FLAG:", showedWarning());



    // если это первый заход из Instagram
    if(
        fromInstagram() &&
        !showedWarning()
    ){

        showWarning();

        return;

    }



    // если уже была показана инструкция
    localStorage.removeItem(
        "webview_warning"
    );


    window.location.replace(LINK);

}



start();