module.exports = function(RED){
    var fs = require('fs');
    var http = require('http');

    const MongoClient = require('mongodb').MongoClient;
    const project = RED.settings.get('projects');

    function end(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var flowData;
        var inputCount = 0;
        var wireCount = 0;
        var context = node.context().flow;
        var wireCheck = false;
        const url = 'mongodb://naufal:labduafa@x1.hcm-lab.id:27070/?authSource=admin';
        const client = new MongoClient(url);
        var opt = {
            host: 'x1.hcm-lab.id',
            port: 1880,
            method: 'GET',
            path: '/flows'
        };
        

        function writeScript(flowData){
            var flowName;
            for(var i in flowData){
                if (flowData[i].type == 'tab'){
                    if(flowData[i].id == config.z){
                        flowName = flowData[i].label;
                        flowName = flowName.replace(/\s/g, "_").toLowerCase();
                    }
                }
            }
            var objectList = context.get('objectList');
            var openBuff = 'var simulation = function(scene){\r\n';
            var groundBuff = '// Ground \r\n'+(context.get('ground') || '\r\n');
            var writeBuff = openBuff + groundBuff;
            context.set('ground', null);
            for (var i in objectList){
                var objectData = context.get(objectList[i]);
                writeBuff = writeBuff + objectData.object + objectData.rotation + '})\r\n';
                context.set(objectList[i], null);
            }
            context.set('objectList', null);
            var closeBuff = '}';
            writeBuff = writeBuff + closeBuff;
            
            fs.open("/data/babylon-ssl/script/scene_"+config.z+".js",'w', function(err, fd){
                if (err) throw err;
                console.log(fd);
                fs.write(fd, writeBuff, function(err){
                    if(err) throw err;
                    fs.close(fd, function(){
                        var projectName = project.activeProject;     
                        client.connect(function(err){
                            if (err) throw err;

                            var db = client.db('nodeScript');
                            var collection = db.collection(projectName);
                            collection.updateOne({name: flowName},{'$set':{'scriptPath':'https://x1.hcm-lab.id:4001/scene_'+config.z+'.js'}},{'upsert': true}, function(err){
                                if (err) throw err;
                            })

                        }) 
                        inputCount++
                        console.log("SUCCESS");
                    })
                })
                });
        }
        
        function httpRequestGet(params){
            return new Promise(function(resolve, reject){
                var req = http.request(params, function(res){
                    let data =''
                    
                    if (res.statusCode < 200 || res.statusCode >= 300) {
                        return reject(new Error('statusCode=' + res.statusCode));
                    }

                    res.on('data', (chunk) => {
                        data += chunk
                    })

                    res.on('end', () => {
                        data = JSON.parse(data);
                        context.set('flowJson', data);
                        resolve(data);
                    });
                });
                req.on('error', function(err){
                    reject(err);
                });
                req.end();
            });
        }

        function httpRequestPost(params, data){
            return new Promise(function(resolve, reject){
                console.log(data)
                var req = http.request(params, function(res){
                    let respond =''

                    res.on('data', (chunk) => {
                        respond += chunk
                    })

                    res.on('end', () => {
                        respond = JSON.parse(respond);
                        resolve(respond);
                    });
                });
                req.on('error', function(err){
                    reject(err);
                });

                req.write(data);
                req.end();
            });
        }

        var login = 'client_id=node-red-admin&grant_type=password&scope=*&username=admin&password=admin'
        var token = {
            host: 'x1.hcm-lab.id',
            port: 1880,
            method: 'POST',
            path: '/auth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(login)
            }

        };
        httpRequestPost(token, login).then(function(data, err){
            if (err) throw err;
            var token = data.access_token
            var request = {
                host: 'x1.hcm-lab.id',
                port: 1880,
                method: 'GET',
                path: '/flows',
                headers: {
                    'Authorization': 'Bearer '+token
                }
            }
            httpRequestGet(request).then(function(data, err){
                flowData = data;
                if(err) throw err;
                for(var i in data){
                    for(var j in data[i].wires){
                        var wireFlow = data[i].wires[j];
                        for(var k in wireFlow){
                            if(wireFlow[k] == config.id){
                                wireCount++;
                            }
                        }
                    }
                }
                if(inputCount == wireCount){
                    writeScript(data);
                }else{
                    wireCheck = true;
                } 
            })

        })
        node.on('input', function(){
            inputCount++
            if(wireCheck){
                if(inputCount == wireCount){
                    writeScript(flowData);
                }
            }
         })
    }
    RED.nodes.registerType("end",end);
}
