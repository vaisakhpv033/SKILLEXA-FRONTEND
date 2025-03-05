export function cacheControlMiddleware(req, res) {
    const url = req.nextUrl.pathname;
    console.log(url)
    if (url === "/login" || url === "/register") {
      res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0");
      res.headers.set("Pragma", "no-cache");
      res.headers.set("Expires", "0");
      console.log("applied headers")
    }
  
    return res; 
  }
  