//
const path = require('path')
const mail = require(path.join(__dirname,'./sendMail.js'));
var json2html = require('json2html');
const fs = require('fs');

const fetch = require( 'node-fetch');

async function bienici(){
const res=await fetch("https://www.bienici.com/realEstateAds.json?filters=%7B%22size%22%3A24%2C%22from%22%3A0%2C%22showAllModels%22%3Afalse%2C%22filterType%22%3A%22buy%22%2C%22propertyType%22%3A%5B%22house%22%2C%22flat%22%5D%2C%22maxPrice%22%3A180000%2C%22minArea%22%3A35%2C%22newProperty%22%3Afalse%2C%22isNotLifeAnnuitySale%22%3Atrue%2C%22isNotInResidence%22%3Atrue%2C%22page%22%3A1%2C%22sortBy%22%3A%22publicationDate%22%2C%22sortOrder%22%3A%22desc%22%2C%22onTheMarket%22%3A%5Btrue%5D%2C%22zoneIdsByTypes%22%3A%7B%22drawnZone%22%3A%5B%22635fa961dd4b2c00b70db6b1%22%5D%7D%7D&extensionType=extendedIfNoResult&leadingCount=2", {
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
});
const excludeWords=['PINEL','PTZ','non contractuel','constructeur','RT 2012', 'Basse Consommation']
const json=await res.json()
const biens=await json.realEstateAds;
const currentDate=new Date();
var result=[]
var bien="";
let rawdata = fs.readFileSync('/home/labonneaffaire/alreadyMailed.json');
let alreadyMailed = JSON.parse(rawdata);
let alreadyMailedFinal=[...alreadyMailed];
//console.log(alreadyMailed)
//console.log(biens[0])
  for (bien of biens) {
//console.log(bien)
    var createDate=new Date(bien.publicationDate);
    if( createDate.getDate()==currentDate.getDate() && 
       createDate.getMonth()==currentDate.getMonth() && 
       createDate.getYear()==currentDate.getYear()
    ){
      //console.log(bien)
      var toSend=true
      var desc=bien.description
      var url=" https://www.bienici.com/annonce/vente/"+bien.id
      for(i=0;i<excludeWords.length;i++){
        if(desc.toLowerCase().includes(excludeWords[i].toLowerCase())){
          toSend=false;
        }else{
          for(j=0;j<alreadyMailed.length;j++){
            let alreadyDesc=alreadyMailed[j].description.substring(0, 300)
console.log("+++++++++++++++++++++++++++++")
//            console.log(alreadyDesc)
//            console.log("---------------------------")
//            console.log(desc)
 //           console.log(desc.toLowerCase().startsWith(alreadyDesc.toLowerCase()))
            if(desc.toLowerCase().startsWith(alreadyDesc.toLowerCase())){
              toSend=false
            }else if(toSend && alreadyMailed.length-1==j && excludeWords.length-1==i){
              alreadyMailedFinal.push({"description":desc})
              result.push(desc+url)
            }
          }
        }
      }
    }
  }
result.push("https://www.bienici.com/recherche/achat/dessin-635fa961dd4b2c00b70db6b1?prix-max=180000&surface-min=35&neuf=non&viagers-exclus=oui&pas-en-residence=oui&mode=galerie&tri=publication-desc")
fs.writeFileSync('/home/labonneaffaire/alreadyMailed.json', JSON.stringify(alreadyMailedFinal), () => { })
mail.sendMail(json2html.render(result));
//console.log(result)
}

bienici()
