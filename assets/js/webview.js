const LINK = "https://fansly.com/hikkimyra/t7";


function isInAppBrowser(){

    const ua = navigator.userAgent || "";

    return (
        /Instagram/i.test(ua) ||
        /FBAN|FBAV/i.test(ua) ||
        /TikTok/i.test(ua) ||
        /musical/i.test(ua) ||
        /Line/i.test(ua)
    );

}



function showWarning(){

document.body.innerHTML = `

<div style="
text-align:center;
padding:30px;
font-family:Arial;
">

<h2>Open in browser</h2>

<p>
Tap ⋯ above<br>
Select "Open in browser"
</p>


<img src="assets/gif/1.gif"
style="width:300px;max-width:90%">


<br><br>


<button id="go"
style="
padding:15px 30px;
font-size:18px;
">

Continue

</button>


</div>

`;


document
.getElementById("go")
.onclick = ()=>{

window.location.href = LINK;

};


}



function start(){


console.log(
navigator.userAgent
);


if(isInAppBrowser()){

showWarning();

return;

}


// обычный браузер

window.location.href = LINK;


}



start();