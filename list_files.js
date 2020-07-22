const fs = require('fs');
const path = require('path');


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
const extracts = walkSync("./extracts");
var tabledata=[];
extracts.forEach(element => {
let data = require(".\\"+element);
tabledata.push(data);
fs.writeFile('./total.json', JSON.stringify(tabledata), () => { })
});
