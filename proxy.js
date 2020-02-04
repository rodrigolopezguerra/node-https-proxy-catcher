var https = require('https'),
    httpProxy = require('http-proxy'),
    fs = require('fs'),
    qs = require('querystring');;


//
// Create the proxy server listening on port 443
//
var proxy = httpProxy.createServer({
    ssl: {
      key: fs.readFileSync('key.pem', 'utf8'),
      cert: fs.readFileSync('cert.pem', 'utf8')
    },
    target: 'https://IP_OF_DESTINATION',  //can use url since have been chaged in host and will cause a loop
    secure: false // Depends on your needs, could be false.
  });



//
// Create your target server
//
https.createServer({
  key: fs.readFileSync('key.pem', 'utf8'),
  cert: fs.readFileSync('cert.pem', 'utf8')
},function (req, res) {
  if(req.url.indexOf('SOME_URL_TO_CATCH') !== -1) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('{"a":"a","b":"b","c":"c"}' );
    res.end();
  } else if (req.url.indexOf('SOME_OTHER_URL_CATCHING_DATA') !== -1) {
    var body = '';
    req.on('data',function(data) {
      body += data;
    })
    req.on('end', function () {
      var post = qs.parse(body);
      console.log(body);
    })
    res.writeHead(200, { 'response': 'OK' });
  } else {
    proxy.web(req,res);
  }
  //
}).listen(443);
