export default function handler(req, res) {

  const LINK = "https://fansly.com/hikkimyra/t7";

  const passed = req.query.open;


  // пользователь уже нажал открыть браузер
  if(passed === "1"){

    res.writeHead(302,{
      Location: LINK
    });

    res.end();
    return;

  }


  const ref = req.headers.referer || "";


  // Instagram
  if(
    ref.includes("instagram.com") ||
    ref.includes("l.instagram.com")
  ){

    res.setHeader(
      "Content-Type",
      "text/html"
    );


    res.end(`

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
    Tap ⋯ above
    and choose Open in browser
    </p>


    <img 
    src="/assets/gif/1.gif"
    style="
    width:300px;
    max-width:90%
    ">


    <br><br>


    <a href="/api/go?open=1">

    Open browser

    </a>


    </body>

    </html>


    `);


    return;

  }



  // обычный заход

  res.writeHead(302,{
    Location: LINK
  });

  res.end();


}