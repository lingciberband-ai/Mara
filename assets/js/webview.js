const LINK = "https://fansly.com/hikkimyra/t7";


function isInstagram(){

    const ref = document.referrer || "";

    return (
        ref.includes("instagram.com") ||
        ref.includes("l.instagram.com")
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



    // если это первый заход после Instagram
    if(isInstagram()){


        if(!sessionStorage.getItem("reloaded")){


            sessionStorage.setItem(
                "reloaded",
                "1"
            );


            setTimeout(()=>{

                location.reload();

            },300);


            return;

        }


        showWarning();

        return;

    }



    window.location.replace(LINK);


}



start();