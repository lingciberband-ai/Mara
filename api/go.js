export default function handler(req,res){

const LINK="https://fansly.com/hikkimyra/t7";


const ref=req.headers.referer || "";

const cookie=req.headers.cookie || "";


// если уже проходил страницу
if(cookie.includes("opened=1")){


res.writeHead(302,{
Location:LINK
});


res.end();

return;

}




// первый вход из Instagram

if(
ref.includes("instagram.com") ||
ref.includes("l.instagram.com")
){



res.setHeader(
"Set-Cookie",
"opened=1; Max-Age=600; Path=/; SameSite=Lax"
);



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
Tap ⋯ above<br>
Choose "Open in browser"
</p>


<img 
src="/assets/gif/1.gif"
style="width:300px;max-width:90%"
>


</body>

</html>

`);


return;

}



// обычный браузер

res.writeHead(302,{
Location:LINK
});


res.end();


}