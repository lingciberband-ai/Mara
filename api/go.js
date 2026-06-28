export default function handler(req, res) {

  const LINK = "https://fansly.com/hikkimyra/t7";


  const ref = req.headers.referer || "";


  const token = req.query.token;



  // если пришёл уже с токеном — редирект

  if(token){

    res.writeHead(302,{
      Location: LINK
    });

    res.end();

    return;

  }



  // Instagram WebView

  if(
    ref.includes("instagram.com") ||
    ref.includes("l.instagram.com")
  ){


    const id =
    Math.random()
    .toString(36)
    .slice(2);



    res.setHeader(
      "Content-Type",
      "text/html"
    );



    res.end(`

    <html>

    <body style="
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
    src="/assets/gif/1.gif"
    style="width:300px;max-width:90%"
    >


    <script>

    // НЕ редиректим автоматически


    </script>


    </body>

    </html>

    `);


    return;

  }




  // обычный заход

  res.writeHead(302,{
    Location:LINK
  });


  res.end();


}