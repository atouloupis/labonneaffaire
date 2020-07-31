const fs = require('fs');
const path = require('path');

function list_files(callback){
// retourner la liste des Fichiers
const walkSync = function(dir, filelist) {
            var path = path || require('path');
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];
            files.forEach(function(file) {
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    filelist = walkSync(path.join(dir, file), filelist);
                }
                else {
                    filelist.push(path.join(dir, file));
                }
            });
            return filelist;

        };

		
///Concatene et enregistre les fichiers
const extracts = walkSync("/home/labonneaffaire/extracts");
var tabledata=[];
var count=0;
extracts.forEach(element => {
let data = require(element);
tabledata.push(data);
fs.writeFile('./total.json', JSON.stringify(tabledata), () => {
	count++;
		if (count==extracts.length){
		callback();
			}
		})
	});


}

module.exports.list_files = list_files;
