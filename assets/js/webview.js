const LINK = "https://fansly.com/hikkimyra/t7";


function fromInstagram(){

    const ref = document.referrer || "";

    return (
        ref.includes("l.instagram.com") ||
        ref.includes("instagram.com")
    );

}



function showWarning(){

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
    style="width:300px;max-width:90%"
    >

    </div>

    `;

}



function start(){


    console.log("REF:", document.referrer);
    console.log("UA:", navigator.userAgent);



    if(fromInstagram()){


        showWarning();

        return;


    }



    window.location.replace(LINK);


}



start();