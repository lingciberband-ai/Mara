const LINK = "https://fansly.com/hikkimyra/t7";


function isInstagramWebView() {

    const ua = navigator.userAgent || "";

    return (
        ua.includes("Instagram") ||
        ua.includes("FBAN") ||
        ua.includes("FBAV") ||
        ua.includes("Instagram")
    );

}



function showMessage(){

    document.body.innerHTML = `
    
    <div style="
        text-align:center;
        padding:40px;
        font-family:Arial;
    ">

    <h2>Open in browser</h2>

    <p>
    Tap ⋮ or ⋯ above<br>
    and choose Open in browser
    </p>

    <img 
    src="assets/gif/1.gif"
    style="width:300px;max-width:90%;">

    </div>
    
    `;

}



(function(){

    console.log("UA:", navigator.userAgent);


    if(isInstagramWebView()){

        showMessage();

        return;

    }


    setTimeout(()=>{

        window.location.href = LINK;

    },500);


})();