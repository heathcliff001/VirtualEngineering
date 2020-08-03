module.exports = function(RED){

    function rotation(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var context = node.context().flow;
        var writeBuff;
        node.on('input', function(msg){
            var mesh = msg.mesh;
            var name = msg.name;
            var count = 0;
            var index;
            var x = (parseFloat(config.xPos)*3.14/180).toFixed(2);
            var y = (parseFloat(config.yPos)*3.14/180).toFixed(2);
            var z = (parseFloat(config.zPos)*3.14/180).toFixed(2);
            var msg = {"mesh": mesh, 'name':name};
            if(context.get('rotPos') == null){
                context.set('rotPos', [[mesh, count, name]]);
                rotInit();
            }else{
                var importFlag = false
                context.get('rotPos').forEach(function(data, idx) {
                    console.log('searching')
                    if(data[2] == name){
                        if(data[0] == mesh){
                            importFlag = true;
                            count = data[1];
                            index = idx;
                        }
                    }    
                });
                if(importFlag == true){
                    var newContext = context.get('rotPos')
                    newContext[index][1]++;
                    context.set('rotPos', newContext);
                    console.log(newContext);
                    rot();
                }else{
                    var rotPos =  context.get('rotPos');
                    rotPos.push([mesh,count, name]);
                    context.set('rotPos', rotPos);
                    rotInit();
                    
                }
            }
            
            function rotInit(){
                writeBuff = 'var '+mesh+'Pos0 = '+mesh+'.rotation.add(new BABYLON.Vector3('+x+', '+y+', '+z+'))\r\n';
                writeBuff = writeBuff+'var '+mesh+'Rot = '+mesh+'.rotation;\r\n';
                writeBuff = writeBuff+'var '+mesh+'Flag0 = false;\r\n';
                writeBuff = writeBuff+'var '+mesh+'Observer0 = scene.onAfterRenderObservable.add(function(){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.x.toFixed(2) != '+mesh+'Pos0.x.toFixed(2)){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.x < '+mesh+'Pos0.x){\r\n';
                writeBuff = writeBuff+mesh+'Rot.x += 0.01;\r\n}\r\n';
                writeBuff = writeBuff+'else if('+mesh+'.rotation.x > '+mesh+'Pos0.x){\r\n';
                writeBuff = writeBuff+mesh+'Rot.x -= 0.01;\r\n}\r\n}\r\n';
                writeBuff = writeBuff+'else{'+mesh+'Rot.x += 0;\r\n';
                writeBuff = writeBuff+'}\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.y.toFixed(2) != '+mesh+'Pos0.y.toFixed(2)){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.y < '+mesh+'Pos0.y){\r\n';
                writeBuff = writeBuff+mesh+'Rot.y += 0.01;\r\n}\r\n';
                writeBuff = writeBuff+'else if('+mesh+'.rotation.y > '+mesh+'Pos0.y){\r\n';
                writeBuff = writeBuff+mesh+'Rot.y -= 0.01;\r\n}\r\n}\r\n';
                writeBuff = writeBuff+'else{'+mesh+'Rot.y += 0;\r\n';
                writeBuff = writeBuff+'}\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.z.toFixed(2) != '+mesh+'Pos0.z.toFixed(2)){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.z < '+mesh+'Pos0.z){\r\n';
                writeBuff = writeBuff+mesh+'Rot.z += 0.01;\r\n}\r\n';
                writeBuff = writeBuff+'else if('+mesh+'.rotation.z > '+mesh+'Pos0.z){\r\n';
                writeBuff = writeBuff+mesh+'Rot.z -= 0.01;\r\n}\r\n}\r\n';
                writeBuff = writeBuff+'else{'+mesh+'Rot.z += 0;\r\n';
                writeBuff = writeBuff+'}\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.equalsWithEpsilon('+mesh+'Pos0,0.01)){\r\n';
                writeBuff = writeBuff+mesh+'Flag0 = true;\r\n';
                writeBuff = writeBuff+'}\r\n';
                writeBuff = writeBuff+'if(scene.onAfterRenderObservable.hasObservers && '+mesh+'Flag0 == true ){\r\n';
                writeBuff = writeBuff+'scene.onAfterRenderObservable.remove('+mesh+'Observer0);\r\n}\r\n})\r\n'
            }

            function rot(){
                console.log("rotated")
                count++
                var prev = count - 1;
                writeBuff = 'var '+mesh+'Pos'+count+' = '+mesh+'Pos'+prev+'.add(new BABYLON.Vector3('+x+', '+y+', '+z+'));\r\n';
                writeBuff = writeBuff+'var '+mesh+'RotFlag'+count+' = false;\r\n';
                writeBuff = writeBuff+'var '+mesh+'Flag'+count+' = false;\r\n';
                writeBuff = writeBuff+'var '+mesh+'Observer'+count+' = scene.onAfterRenderObservable.add(function(){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.equalsWithEpsilon('+mesh+'Pos'+prev+',0.01)){\r\n';
                writeBuff = writeBuff+mesh+'RotFlag'+count+' = true;\r\n}\r\n';
                writeBuff = writeBuff+'if('+mesh+'RotFlag'+count+' == true){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.x.toFixed(2) != '+mesh+'Pos'+count+'.x.toFixed(2)){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.x < '+mesh+'Pos'+count+'.x){\r\n';
                writeBuff = writeBuff+mesh+'Rot.x += 0.01;\r\n}\r\n';
                writeBuff = writeBuff+'else if('+mesh+'.rotation.x > '+mesh+'Pos'+count+'.x){\r\n';
                writeBuff = writeBuff+mesh+'Rot.x -= 0.01;\r\n}\r\n}\r\n';
                writeBuff = writeBuff+'else{'+mesh+'Rot.x += 0;\r\n';
                writeBuff = writeBuff+mesh+'Flag'+count+'[0] = true;}\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.y.toFixed(2) != '+mesh+'Pos'+count+'.y.toFixed(2)){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.y < '+mesh+'Pos'+count+'.y){\r\n';
                writeBuff = writeBuff+mesh+'Rot.y += 0.01;\r\n}\r\n';
                writeBuff = writeBuff+'else if('+mesh+'.rotation.y > '+mesh+'Pos'+count+'.y){\r\n';
                writeBuff = writeBuff+mesh+'Rot.y -= 0.01;\r\n}\r\n}\r\n';
                writeBuff = writeBuff+'else{'+mesh+'Rot.y += 0;\r\n';
                writeBuff = writeBuff+'}\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.z.toFixed(2) != '+mesh+'Pos'+count+'.z.toFixed(2)){\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.z < '+mesh+'Pos'+count+'.z){\r\n';
                writeBuff = writeBuff+mesh+'Rot.z += 0.01;\r\n}\r\n';
                writeBuff = writeBuff+'else if('+mesh+'.rotation.z > '+mesh+'Pos'+count+'.z){\r\n';
                writeBuff = writeBuff+mesh+'Rot.z -= 0.01;\r\n}\r\n}\r\n';
                writeBuff = writeBuff+'else{'+mesh+'Rot.z += 0;\r\n';
                writeBuff = writeBuff+'}\r\n';
                writeBuff = writeBuff+'if('+mesh+'.rotation.equalsWithEpsilon('+mesh+'Pos'+count+',0.01)){\r\n';
                writeBuff = writeBuff+mesh+'Flag'+count+' = true;\r\n';
                writeBuff = writeBuff+'}\r\n';
                writeBuff = writeBuff+'if(scene.onAfterRenderObservable.hasObservers && '+mesh+'Flag'+count+' == true ){\r\n';
                writeBuff = writeBuff+'scene.onAfterRenderObservable.remove('+mesh+'Observer'+count+');\r\n}\r\n}\r\n})\r\n';

            }

            if(context.get(msg.name+'.rotation') == null){
                context.set(msg.name+'.rotation', writeBuff);
                setTimeout(function(){
                    node.send(msg);
                }, 1000);
                console.log('sent init');
            }else{
                var contextBuff = context.get(msg.name+'.rotation')+'\r\n'+writeBuff;
                context.set(msg.name+'.rotation', contextBuff);
                setTimeout(function(){
                    node.send(msg);
                }, 1000);
                console.log('sent');
            }
        });
        
    }
    RED.nodes.registerType("rotation",rotation);
}