module.exports = function(RED){
    var fs = require('fs');
    function ground(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var msg = {};
        var context = node.context().flow;
        var writeBuff = 'var '+config.name+' = BABYLON.MeshBuilder.CreateGround("'+config.name+'",{height: '+config.height+', width: '+config.width+'},scene);\r\n';
        writeBuff = writeBuff + config.name+'.physicsImpostor = new BABYLON.PhysicsImpostor('+config.name+', BABYLON.PhysicsImpostor.PlaneImpostor, {mass: 0, friction: '+config.friction+'}, scene);\r\n';
        writeBuff = writeBuff + config.name + '.checkCollisions = true;\r\n'
        
        if(context.get('ground') == null){
            context.set('ground', writeBuff);
            node.send(msg);
        }else{
            setTimeout(function(){
                node.send(msg);
            }, 1000);
        }
        
    }
    RED.nodes.registerType("ground",ground);
}