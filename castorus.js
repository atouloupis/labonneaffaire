const curl = new (require( 'curl-request' ))();
const htmlToJson = require( 'html-to-json' );
const isOdd = require('is-odd');
const path = require('path');
var finderConfig = path.join(__dirname, './config/finderConfig.json');
var jsonfile = require('jsonfile');

jsonfile.readFile(finderConfig, function (err, finder) {
	if (err) return handleError(err);

for (var i=0;i<finder.country.length;i++){
        var list=finder.country[i];
        setTimeout(getDetails,i*500,list,finder,function(err,countryDetail){
           
        });
        
    }
});

function getDetails (list,finder,callback)
{
    var buyList=[];
        curl.setHeaders([
            'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0',
            'Accept: text/html'
        ])
        .get('https://www.castorus.com/s/'+list.link+"--"+finder.surfaceMin+"--"+finder.prixMin+"-"+finder.prixMax+"-----------------------")
        .then(({statusCode, body, headers}) => {

            htmlToJson.parse(body, function () {
                var i = 0;
                var j=0;
                return this.map('.price', function (item) {
                    i++;
                    if (!isOdd(i)){buyList[j]=JSON.parse(JSON.stringify({"pricesqm":item.text()}));j++;}
                // console.log(buyList);
                });
            }).done(function (items) {
                // console.log(list.codePostal);
                // console.log(items);
            }, function (err) {
            // Handle error
            });
    
            htmlToJson.parse(body, function () {
                var i = 0;
                                var j=0;
                return this.map('.price', function (item) {
                    i++;
                    if (isOdd(i)){buyList[j]=Object.assign(buyList[j],JSON.parse(JSON.stringify({"price":item.text()})));j++}
                });
            }).done(function (items) {
                // Items should be: ['1','2']
                //console.log(items);
            }, function (err) {
                // Handle error
            });
    
    
            htmlToJson.parse(body, function () {
                var i=0;
                return this.map('.surf', function (item) {
                    buyList[i]=Object.assign(buyList[i],JSON.parse(JSON.stringify({"surface":item.text()})));
                    i++;
                    console.log(i)
                });
            }).done(function (items) {
                // Items should be: ['1','2']
                // console.log(items);
            }, function (err) {
                // Handle error
            });
            //console.log(statusCode, body, headers)
        })
        .catch((e) => {
            console.log(e);
        });
}
