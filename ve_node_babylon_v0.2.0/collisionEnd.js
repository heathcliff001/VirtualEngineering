module.exports = function(RED){
    var fs = require('fs');
    function collisionEnd(config){
        RED.nodes.createNode(this, config);
        var node = this;
        var writeBuff = null;
        var trueBuff = null;
        var falseBuff = null;
        var i = 0;
        node.on('input', function(msg){
            if( i == 0 ){
                if(msg.collision === "true"){
                    trueBuff = msg.collisionWriteBuff;
                }else if(msg.collision === "false"){
                    falseBuff = msg.collisionWriteBuff;
                }
                i = i + 1;
            }else{
                if(msg.collision === "true"){
                    trueBuff = msg.collisionWriteBuff;
                }else if(msg.collision === "false"){
                    falseBuff = msg.collisionWriteBuff;
                }
                writeBuff = msg.ifBuff+trueBuff+'}\r\n'+msg.elseBuff+falseBuff+'}\r\n';
                fs.open("D:\\Tugas\\TA\\TA\\program\\ve_javascript\\collision_"+msg.name+".js",'w', function(err, fd){
                    if (err) throw err;
                    fs.write(fd, writeBuff, function(err){
                        if(err) throw err;
                        fs.close(fd, function(){
                            console.log("SUCCESS");
                            node.send(msg);
                            })
                        })
                    });
            }
            // if(msg.collision === "true"){
            //     writeBuff = msg.ifBuff+msg.collisionWriteBuff+'}\r\n'+msg.elseBuff+'}\r\n';
            //     fs.open("D:\\Tugas\\TA\\TA\\program\\ve_javascript\\collision_"+msg.name+".js",'w', function(err, fd){
            //         if (err) throw err;
            //         fs.write(fd, writeBuff, function(err){
            //             if(err) throw err;
            //             fs.close(fd, function(){
            //                 console.log("SUCCESS");
            //                 node.send(msg);
            //                 })
            //             })
            //         });
            // }else if(msg.collision === "false"){
            //     writeBuff = msg.ifBuff+'}\r\n'+msg.elseBuff+msg.collisionWriteBuff+'}\r\n';
            //     fs.open("D:\\Tugas\\TA\\TA\\program\\ve_javascript\\collision_"+msg.name+".js",'w', function(err, fd){
            //         if (err) throw err;
            //         fs.write(fd, writeBuff, function(err){
            //             if(err) throw err;
            //             fs.close(fd, function(){
            //                 console.log("SUCCESS");
            //                 node.send(msg);
            //                 })
            //             })
            //         });
            // }
        });
    }
    RED.nodes.registerType("collisionEnd",collisionEnd);
}