var path = require('path');
var fs = require('fs');
var server = require('../server');
var app = require(path.resolve(__dirname, '../server'));
var outputPath = path.resolve(__dirname, '../../common/models');
var modelConfigPath= path.resolve(__dirname, '/server/model-config.json');
var lbTables = ['book'];//not include models
console.log(lbTables);

var ds = server.dataSources.db;



function schemaCB(err, schema) {
  // console.log(JSON.stringify(schema[Object.keys(schema)[0]]));
  if(schema) {
    if (lbTables.indexOf(schema.name) == -1){
    console.log("Auto discovery success: " + schema[Object.keys(schema)[0]].name);
    var outputName = outputPath + path.sep +schema[Object.keys(schema)[0]].name + '.json';
    // console.log(schema);
    fs.writeFile(outputName, JSON.stringify(schema[Object.keys(schema)[0]],null,2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputName);
      }
    });
  }
  }
  if(err) {
    console.error(err);
    return;
  }
  return;
};


function schemaonlyconsoledCB(err, schema) {
  // console.log(JSON.stringify(schema[Object.keys(schema)[0]]));
  if(schema) {
    console.log(JSON.stringify(schema[Object.keys(schema)[0]],null,2));
  }
  if(err) {
    console.error(err);
    return;
  }
  return;
};


ds.discoverModelDefinitions({ views: true,limit: 100,schema:server.dataSources.db.settings.database},
function(err,schema){
var countCall=schema.length;
 if (schema){
   for (var objindex in schema)
              {
                 if (lbTables.indexOf(schema[objindex].name) == -1){
                 ds.discoverSchemas(schema[objindex].name,{schema:server.dataSources.db.settings.database,relations:true,all:true,views:true},schemaCB);


             }


             }
 }

}
);
