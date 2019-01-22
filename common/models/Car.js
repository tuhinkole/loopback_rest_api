var server = require('../../server/server');

module.exports = function(car) {
   
   
    car.findByName= function (data,cb) {
        var ds = car.dataSource;
        console.log("DATA>>>>",data);

        var sql = "select * from car where name= '"+data.name+"' and roll='"+data.roll+"' and class='"+data.class+"'";
        console.log("SQL>>>>>",sql);

        ds.connector.query(sql,[data], function (err, respondedheader) {

            if (err) cb(null, {sent: false,message:"Unable to Update"});
            if(respondedheader)
            {
              cb(null, {sent: true,data:respondedheader});
            }
        });
      }

      car.remoteMethod('findByName', {
          http: { path: '/findByName', verb: 'get' },
          accepts: [{arg: 'data', type: 'Object'}],
          returns: { arg: 'payload', type: 'Object' }
        });


      

car.settings.acls= [

                                {
                                "principalType": "ROLE",
                                "principalId": "$everyone",
                                "permission": "ALLOW",
                                "property": "findByName"
                                }
                    ]


}
