var express= require('express');
var app =express();
const neo4j = require('neo4j-driver').v1;
var user="";
var password="";
var uri
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic(user,password));

app.get('/',function (req,res){
        const session = driver.session();
        
        const systemName = 'DepRep';
        var nodeName='';;
        
        const resultPromise = session.run(
                                          'match (a:System {name: $name}) RETURN a',
                                          {name: systemName}
                                          );
        
        resultPromise.then(result => {
                           session.close();
                           
                           const singleRecord = result.records[0];
                           const node = singleRecord.get(0);
                           
                           nodeName = node.properties.name;
                           res.send('System:'+nodeName)

                           // on application exit:
                           driver.close();
                           });
        });

var server = app.listen(3030,function(){
                        
                        var host = server.address().address;
                        var port = server.address().port;
                        
                        console.log("Server listening at http://%s:%s",host,port);
                        });
