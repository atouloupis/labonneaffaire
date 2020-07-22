const fs = require('fs');
const path = require('path');


//Lire le fichier total et parcourir les villes

let list_biens = require('./total.json')
// console.log(list_biens)

let config = require('./config/finderConfig.json');


for (i=0;i<list_biens.length;i++) //parcourir les villes
{
var good_list=[];
var list_title=list_biens[i][0].title;
var list_codepostal=list_biens[i][0].codepostal;
var list_price_meter=list_biens[i][0].price_meter;
var list_surface=list_biens[i][0].surface;
var list_depuis=list_biens[i][0].depuis;
var list_link=list_biens[i][0].link;

if (list_title!=undefined){
	for (j=0;j<list_title.length;j++) //parcourir les biens
	{
		
		if (list_title[j].search("viager")<0)//Chercher le mot viager
		{
			if (list_depuis[j]<3)
			{
				config.city.forEach(city=> 
				{
					if (city.codePostal==list_codepostal)
					{console.log(list_price_meter[j])
					console.log(city.prixM2Max)
						if (list_price_meter[j]<city.prixM2Max)
						{
							var bien = {
							"title":list_title[j],
							"codepostal":list_codepostal,
							"depuis":list_depuis[j]
							}
							good_list.push(bien);
						}
					}
				});

			}
		}
	}
}
console.log(good_list);
}
//Calculer le prix moyen par ville au m²



// Récupérer les biens < 3j


// Récupérer la conf pour la ville (code postal)


//Retirer les prix > la conf par ville


//Calculer la rentabilité par rapport au prix moyen ville


// supprimer les rentabilité en dessous de X%

//stocker dans un fichier ce qui reste