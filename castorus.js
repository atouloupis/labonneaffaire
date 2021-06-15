// const curl = new (require( 'curl-request' ))();
// const htmlToJson = require( 'html-to-json' );
// const isOdd = require('is-odd');
const path = require('path');
var finderConfig = path.join(__dirname, './config/finderConfig.json');
var jsonfile = require('jsonfile');
const getCastorus = require('/home/labonneaffaire/getCastorus.js');

jsonfile.readFile(finderConfig, function (err, finder) {
	if (err) return console.log(err);

for (var i=0;i<finder.city.length;i++){
        var list=finder.city[i];
        setTimeout(getDetails1,i*1500,list,finder);
        
    }
});


function getDetails1(list,finder)
{
 getCastorus.getCastorus(list.codePostal,`https://www.castorus.com/s/`+list.linkCastorus+`--`+finder.surfaceMin+`--`+finder.prixMin+`-`+finder.prixMax+`-----------------------`);
}
