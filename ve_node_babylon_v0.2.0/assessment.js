module.exports = function(RED){
    const MongoClient = require('mongodb').MongoClient;
    const project = RED.settings.get('projects');
    function assessment(config){
        RED.nodes.createNode(this, config);
        var node = this;
        const url = 'mongodb://naufal:labduafa@x1.hcm-lab.id:27070/?authSource=admin';
        const client = new MongoClient(url);

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
                if(err) throw err;
                
                var flowName;
                for(var i in data){
                    if (data[i].type == 'tab'){
                        if(data[i].id == config.z){
                            data = data[i].label;
                            data = data.replace(/\s/g, "_").toLowerCase();
                        }
                    }
                }

                client.connect(function(err){
                    if(err) throw err;

                    var projectName = project.activeProject; 
                    var db = client.db('nodeQuestion');
                    var collection = db.collection(projectName);
                    collection.updateOne({name: flowName},{'$set':{'question':config.question, 'option': config.option}},{'upsert': true}, function(err){
                        if (err) throw err;
                    })
                })
            })

        })

        

        
    }
    RED.nodes.registerType("assessment",assessment);
}
