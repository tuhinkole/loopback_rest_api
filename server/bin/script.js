var server = require('../server');
var ds = server.dataSources.db;
var lbTables = ['book','AccessToken','ACL','Role','RoleMapping','User','Car'];

ds.isActual(lbTables, function(err, actual) {
  if (!actual) {
console.log("Models syncing ");
ds.autoupdate(lbTables, function (err, result) {
if (err) throw er;
ds.disconnect();
});
}

else {
console.log("Models is already synced");
}
});
