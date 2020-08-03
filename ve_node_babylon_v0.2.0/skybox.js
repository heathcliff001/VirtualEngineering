module.exports = function(RED){
    
    function skybox(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var msg = {};
        var context = node.context().flow;
        var writeBuff = 'var '+config.name+' = BABYLON.MeshBuilder.CreateBox("'+config.name+'", {size:'+config.size+'}, scene);\r\n';
        writeBuff = writeBuff+'var '+config.name+'Material = new BABYLON.StandardMaterial('+config.name+', scene);\r\n';
        writeBuff = writeBuff+config.name+'Material.backFaceCulling = false;\r\n';
        writeBuff = writeBuff+config.name+'Material.reflectionTexture = new BABYLON.CubeTexture("'+path+'", scene);\r\n';
        writeBuff = writeBuff+config.name+'Material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;\r\n';
        writeBuff = writeBuff+config.name+'Material.diffuseColor = new BABYLON.Color3(0, 0, 0);\r\n';
        writeBuff = writeBuff+config.name+'Material.specularColor = new BABYLON.Color3(0, 0, 0);\r\n';
        writeBuff = writeBuff+config.name+'.material = '+config.name+'Material;\r\n';

        if(context.get('skybox') == null){
            context.set('skybox', writeBuff);
            setTimeout(function(){
                node.send(msg);
            }, 1000);
        }else{
            node.status({fill:'red',shape:'dot',text:'ERROR: you only can add one skybox'});
            setTimeout(function(){
                node.send(msg);
            }, 1000);
        }
        
    }
    RED.nodes.registerType("skybox",skybox);
}