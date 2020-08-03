module.exports = function(RED){
    var fs = require('fs');
    function collisionStart(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var object1 = null;
        var object2 = null;
        var ifBuff = null;
        var elseBuff = null;
        i = 0;
        node.on('input', function(msg){
            if(i == 0){
                object1 = msg.object;
                i = i+ 1;
            }else{
                object2 = msg.object;
                ifBuff = 'if('+object1+'.intersectsMesh('+object2+', true)) {\r\n';
                elseBuff = 'else{\r\n';
                var msgTrue = {'name': object1+'_'+object2,'object': object1, "ifBuff": ifBuff, "elseBuff": elseBuff, "collision": "true"};
                var msgFalse = {'name': object1+'_'+object2,'object': object2, "ifBuff": ifBuff, "elseBuff": elseBuff, "collision": "false"};
                node.send([msgTrue, msgFalse]);
            }
                
        });
    }
    RED.nodes.registerType("collisionStart",collisionStart);
}