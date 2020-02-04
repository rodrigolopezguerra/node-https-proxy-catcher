# node-https-proxy-catcher
Little https proxy that handle the request and modify the answer based on the destination URL

# POC
I Wanted to create a little https proxy that was able to catch some request before they were sent to destination, and based on the URL, return a different response. For educational purpose i was altering the behaviour of an program, modifying the returned json.

# 1 . Change you host file
/etc/hosts --> Linux
C:\Windows\System32\Drivers\etc\hosts --> Windows 10

Add your host like :

127.0.0.1 someURL.com

# 2. Modify 

SOME_URL_TO_CATCH : replace by desired path and change the returned json as desired
SOME_OTHER_URL_CATCHING_DATA : example where request payload is catch

# 3. Create cert.pem and key.pem

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

Windows : Here are the binaries . https://wiki.openssl.org/index.php/Binaries

# 4. Have fun
