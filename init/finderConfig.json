var mongo = require('../src/tools/mongoDb');
var urlMasternode = "mongodb://localhost:27017/labonneaffaire";
var mongoClient = require('mongodb').MongoClient;

finder=[
{
	serverName:"Telos1",
	crypto:"Telos",
	pubkey:"GfACJnycG7T3zpYgHQty7An3wGvWjaWUU4",
	collateral:100000,
	symbol:'telos'
},
{"country" :[
    { codePostal:"75020",
    link :"Paris-20eme-ardsmnt,32709,2-----200000-----------------------",
    prixM2Max:5500
    
    }
}
]
prixMax:200000,
prixMin:100000,
surfaceMin:15,
motsInterdits:["viager","neuf","contractuelle"]

mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    dbase = db.db("labonneaffaire");
	mongo.createCollection (dbase,'finderConfig',function(){
		mongo.insertCollection(dbase,'finderConfig', finder, function() {});
					db.close();
	});
});