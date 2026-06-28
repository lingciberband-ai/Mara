const LINK = "https://fansly.com/hikkimyra/t7";


let tokens = new Map();



export default function handler(req, res) {


    const ref = req.headers.referer || "";


    const token = req.query.token;



    // второй заход из браузера

    if(token && tokens.has(token)){


        tokens.delete(token);


        res.writeHead(302,{
            Location: LINK
        });


        res.end();

        return;

    }




    // первый заход из Instagram

    if(
        ref.includes("instagram.com") ||
        ref.includes("l.instagram.com")
    ){


        const id =
        Math.random()
        .toString(36)
        .substring(2);



        tokens.set(id,true);



        res.setHeader(
            "Content-Type",
            "text/html"
        );



        res.end(`

        <!DOCTYPE html>

        <html>

        <body style="
        text-align:center;
        font-family:Arial;
        padding:40px;
        ">


        <h2>
        Open in browser
        </h2>


        <p>
        Tap ⋯ above<br>
        Choose "Open in browser"
        </p>


        <img 
        src="/assets/gif/1.gif"
        style="
        width:300px;
        max-width:90%;
        ">


        <script>

        setTimeout(()=>{

            window.location.href =
            "/api/go?token=${id}";

        },1000);


        </script>


        </body>

        </html>

        `);


        return;

    }



    // обычный браузер

    res.writeHead(302,{
        Location: LINK
    });


    res.end();


}