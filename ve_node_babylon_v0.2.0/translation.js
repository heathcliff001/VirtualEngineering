module.exports = function(RED){
    var fs = require('fs');
    function translation(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var context = node.context().flow;
        var name = null;
        var writeBuff;
        node.on('input', function(msg){
        if( msg.collision === null){
            name = msg.object;
            var msg = {"object": name};
            writeBuff = name+'.physicsImpostor.setLinearVelocity(new BABYLON.Vector3('+config.xSpeed+', '+config.ySpeed+', '+config.zSpeed+'));'
            if(context.get('translation') == null){
                context.set('translation', writeBuff);
                node.send(msg);
            }else{
                var contextBuff = context.get('translation')+'\r\n'+writeBuff;
                context.set('translation', contextBuff);
                node.send(msg);
            }
        }else{
            console.log("collision is happened");
            name = msg.object;
            var transBuff = name+'.physicsImpostor.setLinearVelocity(new BABYLON.Vector3('+config.xSpeed+', '+config.ySpeed+', '+config.zSpeed+'));\r\n';
            msg.collisionWriteBuff = transBuff;
            node.send(msg);
        }
        });
        
    }
    RED.nodes.registerType("translation",translation);
}