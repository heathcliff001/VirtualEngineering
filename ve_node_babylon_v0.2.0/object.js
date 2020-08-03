module.exports = function(RED){
    var https = require('http');
    
    function httpGetJson(params){
        return new Promise(function(resolve, reject){
            var req = https.request(params, function(res){
                let data =''
                
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }

                res.on('data', (chunk) => {
                    data += chunk
                })

                res.on('end', () => {
                    data = JSON.parse(data);
                    resolve(data);
                });
            });
            req.on('error', function(err){
                reject(err);
            });
            req.end();
        });
    }

    function sendData(node, writeBuff, msg, context, config){
        if(context.get(msg.name) == null){
            context.set(msg.name+'.object', writeBuff); 
            if(context.get('objectList') == null){
                var objectArr = [msg.name]
                context.set('objectList', objectArr);
                setTimeout(function(){
                    node.send(msg)
                }, 1000);
            }else{
                var objectArr = context.get('objectList');
                objectArr.push(msg.name);
                context.set('objectList', objectArr);
                setTimeout(function(){
                    node.send(msg)
                }, 1000);
            }  
        }else{
            setTimeout(function(){
                node.send(msg);
            }, 1000);
        }
    }
    function object(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var context = node.context().flow;
        var writeBuff;
        var name = config.name.replace(/\s/g, "_").toLowerCase();
        var msg = {"mesh": config.mesh, 'name':name};
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb://naufal:labduafa@x1.hcm-lab.id:27070/?authSource=admin';
        const client = new MongoClient(url);
        
        function getData(){
            client.connect(function(err) {
                if(err) throw err;
                const db = client.db("3DObjectManagement");
                const collection = db.collection(config.name);
                collection.find({"contentType": 'gltf'}).toArray(function(err, docs){
                    if (err) throw err;
                    //var objectFile = docs[0].name;
                    var objectPath = docs[0].path;
                    var objectJson = new URL('http://x1.hcm-lab.id:3000/'+objectPath);
                    writeBuff= 'BABYLON.SceneLoader.ImportMesh("", "https://x1.hcm-lab.id:3001/","'+objectPath+'", scene, function (mesh, particle, skeleton) {\r\n';
                    httpGetJson(objectJson).then(function(data){
                        var first = true;
                        for(var i in data.nodes){
                            var meshName = data.nodes[i].name;
                            meshName = meshName.replace(/\s/g, "_").toLowerCase();
                            if (data.nodes[i].mesh != null){
                                writeBuff = writeBuff + 'var '+meshName+'= mesh['+i+']\r\n';
                                if(first){
                                    writeBuff = writeBuff + meshName+'.position = new BABYLON.Vector3('+config.xPos+', '+config.yPos+', '+config.zPos+');\r\n';
                                    writeBuff = writeBuff + meshName + '.physicsImpostor = new BABYLON.PhysicsImpostor('+meshName+', BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);\r\n';
                                    writeBuff = writeBuff + meshName + '.checkCollisions = true;\r\n'
                                    writeBuff = writeBuff + meshName+'.scaling = new BABYLON.Vector3('+config.scale+', '+config.scale+', '+config.scale+');\r\n';
                                    writeBuff = writeBuff + 'var '+meshName+'Euler = '+meshName+'.rotationQuaternion.toEulerAngles()\r\n';
                                    writeBuff = writeBuff + meshName+'.rotation = new BABYLON.Vector3('+meshName+'Euler.x, '+meshName+'Euler.y, '+meshName+'Euler.z);\r\n';
                                    first = false   
                                }else{
                                    writeBuff = writeBuff + meshName + '.physicsImpostor = new BABYLON.PhysicsImpostor('+meshName+', BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);\r\n';
                                    writeBuff = writeBuff + meshName + '.checkCollisions = true;\r\n'
                                    writeBuff = writeBuff + meshName+'.scaling = new BABYLON.Vector3('+config.scale+', '+config.scale+', '+config.scale+');\r\n';
                                    writeBuff = writeBuff + 'var '+meshName+'Euler = '+meshName+'.rotationQuaternion.toEulerAngles()\r\n';
                                    writeBuff = writeBuff + meshName+'.rotation = new BABYLON.Vector3('+meshName+'Euler.x, '+meshName+'Euler.y, '+meshName+'Euler.z);\r\n';
                                }
                            }else{
                                writeBuff = writeBuff + 'var '+meshName+'= mesh['+i+']\r\n';
                                writeBuff = writeBuff + meshName + '.physicsImpostor = new BABYLON.PhysicsImpostor('+meshName+', BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);\r\n';
                                writeBuff = writeBuff + meshName + '.checkCollisions = true;\r\n'
                            }
                        }
                        sendData(node, writeBuff, msg, context, config);
                        client.close();
                    })
                });
            });
        }
        if(context.get(config.name) != null){
            
        }else{
            console.log('get data')
            getData();
        }
        // if(context.get('objectImport') == null){
        //     context.set('objectImport', [config.name]);
        //     getData();
        // }else{
        //     var importFlag = false
        //     context.get('objectImport').forEach(function(data) {
        //         if(data == config.name){
        //             importFlag = true;
        //         }    
        //     });
        //     console.log(importFlag);
        //     if(importFlag == true){
                
        //     }else{
        //         var objectImport =  context.get('objectImport');
        //         objectImport.push(config.name);
        //         context.set('objectImport', objectImport);
        //         getData();
        //     }
        // }
    }
    RED.nodes.registerType("object",object);
}