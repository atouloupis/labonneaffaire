const fs = require('fs');
const path = require('path');
//console.log(path.join(__dirname,'./'));
const mail = require(path.join(__dirname,'./sendMail.js'));
var json2html = require('json2html');

//Lire le fichier total et parcourir les villes

var config = require(path.join(__dirname,'./config/finderConfig.json'));
var concat_annonce = require(path.join(__dirname,'./list_files.js'));
concat_annonce.list_files(function(callback){ //concaténer les fichiers de résultat des recherche présents dans le dossier extracts


var count=0;
var good_list=[];
var list_link=[];
var list_biens = require(path.join(__dirname,'./total.json'));
for (i=0;i<list_biens.length;i++) //parcourir les villes
{
var tous_biens=list_biens[i][0];
var list_title=list_biens[i][0].title;
var list_codepostal=list_biens[i][0].codepostal;
var list_price_meter=list_biens[i][0].price_meter;
var list_surface=list_biens[i][0].surface;
var list_depuis=list_biens[i][0].depuis;
var list_link=list_biens[i][0].link;
if (list_link!=undefined){
	for (j=0;j<list_title.length;j++) //parcourir les biens
	{
	    var ignoreGlobal=0;
            if(config.motsInterdits.length>0){
             config.motsInterdits.forEach(motInterdit=>
	     {
	    if(list_link[j].data[0].data[0]!=undefined){
              if (list_link[j].data[0].data[0].search(motInterdit)>0 && list_title[j].search(motInterdit)>0){ignoreGlobal=1;} 
		//vérifie qu'il n'y a pas de mots interdits
	      }
             })
	    }

		if (list_link[j]!=undefined)//verifie que le lien existe
		{
			if (list_depuis[j]<2) //date depuis moins de 3 jours
			{
				config.city.forEach(city=>
				{
					if (city.codePostal==list_codepostal)
					{
						if (list_price_meter[j]<city.prixM2Max) //le prix au m2 n'est pas supérieur au max fixé dans le fichier de config
						{
						if (list_price_meter[j]*list_surface[j]<config.prixMax && config.apport/(list_price_meter[j]*list_surface[j])>0.1) //le prix au m2 n'est pas supérieur au max fixé dans le fichier de config & apport > 10%
						{
						var ignore=0;
							if(city.motsInterdits.length>0){
 								city.motsInterdits.forEach(motInterdit=>{
									if (list_link[j].data[0].data[0].search(motInterdit)>0){ignore=1;} //vérifie mots interdits, si oui ignore = 1
 								})
							}
						if (ignore==0 && ignoreGlobal==0){ //verifie si on ignore pas le bien
							var prix_achat=list_price_meter[j]*list_surface[j]*0.9;//Offre à -10% minimum
							var prix_revente=city.prixM2VenteEstime*list_surface[j];//surface X prix m² estimé dans le fichier de config
							var droits_mutation=prix_achat*config.droits_mutation;//2% du prix d'achat = frais de notaire
							var frais_agence=prix_achat*config.droits_mutation;//5% du prix d'achat
							var garantie_banque=prix_achat*config.garantie_banque;//0,7% du prix d'achat par an
							var renovation=list_surface[j]*config.renovation;//1000€ du m²
							var totalprojet=prix_achat+droits_mutation+frais_agence+config.frais_dossier+garantie_banque+renovation;//prix achat + droits de mutation + frais d'agence + frais de dossier bancaire + garantie bancaire + renovation
							var interetcrédit=(totalprojet-config.apport)*config.interetcrédit;//3% par an
							var gain_brut = prix_revente-(totalprojet+config.fraislevebancaire+interetcrédit);
							var rendement=gain_brut/(totalprojet+interetcrédit+config.fraislevebancaire);
							var TVA = (0.2*gain_brut)-(0.05*renovation);//20% sur la marge moins 5% de TVA récupéré sur les travaux.
							var gain_net=(gain_brut-TVA)/2;
							var bien = {
							"title":list_title[j],
							"codepostal":list_codepostal,
							"prix avec offre":Math.round(prix_achat)+"€",
							"prix m² réel":Math.round(list_price_meter[j])+"€",
							"rendement":Math.round(rendement*100)+"%",
							"gain net":Math.round(gain_net)+"€",
							"lien":list_link[j].address
							}
							good_list.push(bien);
							count++;
						}
						}
						}
					}
				});

			}
		}
		}
	}
}
mail.sendMail(json2html.render(good_list));
//console.log(good_list);
});


