var simulation = function(scene){
// Ground 
var ground = BABYLON.MeshBuilder.CreateGround("ground",{height: 100, width: 100},scene);
ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, {mass: 0, friction: 0}, scene);
ground.checkCollisions = true;
BABYLON.SceneLoader.ImportMesh("", "https://x1.hcm-lab.id:3001/","upload/proyektor-usable/proyektor-usable.gltf", scene, function (mesh, particle, skeleton) {
var box01= mesh[0]
box01.position = new BABYLON.Vector3(0, 1, 0);
box01.physicsImpostor = new BABYLON.PhysicsImpostor(box01, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
box01.checkCollisions = true;
box01.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var box01Euler = box01.rotationQuaternion.toEulerAngles()
box01.rotation = new BABYLON.Vector3(box01Euler.x, box01Euler.y, box01Euler.z);
var cylinder01= mesh[1]
cylinder01.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder01, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder01.checkCollisions = true;
cylinder01.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder01Euler = cylinder01.rotationQuaternion.toEulerAngles()
cylinder01.rotation = new BABYLON.Vector3(cylinder01Euler.x, cylinder01Euler.y, cylinder01Euler.z);
var cylinder04= mesh[2]
cylinder04.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder04, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder04.checkCollisions = true;
cylinder04.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder04Euler = cylinder04.rotationQuaternion.toEulerAngles()
cylinder04.rotation = new BABYLON.Vector3(cylinder04Euler.x, cylinder04Euler.y, cylinder04Euler.z);
var cylinder06= mesh[3]
cylinder06.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder06, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder06.checkCollisions = true;
cylinder06.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder06Euler = cylinder06.rotationQuaternion.toEulerAngles()
cylinder06.rotation = new BABYLON.Vector3(cylinder06Euler.x, cylinder06Euler.y, cylinder06Euler.z);
var cylinder07= mesh[4]
cylinder07.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder07, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder07.checkCollisions = true;
cylinder07.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder07Euler = cylinder07.rotationQuaternion.toEulerAngles()
cylinder07.rotation = new BABYLON.Vector3(cylinder07Euler.x, cylinder07Euler.y, cylinder07Euler.z);
var cylinder09= mesh[5]
cylinder09.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder09, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder09.checkCollisions = true;
cylinder09.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder09Euler = cylinder09.rotationQuaternion.toEulerAngles()
cylinder09.rotation = new BABYLON.Vector3(cylinder09Euler.x, cylinder09Euler.y, cylinder09Euler.z);
var cylinder02= mesh[6]
cylinder02.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder02, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder02.checkCollisions = true;
cylinder02.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder02Euler = cylinder02.rotationQuaternion.toEulerAngles()
cylinder02.rotation = new BABYLON.Vector3(cylinder02Euler.x, cylinder02Euler.y, cylinder02Euler.z);
var cylinder12= mesh[7]
cylinder12.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder12, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder12.checkCollisions = true;
cylinder12.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder12Euler = cylinder12.rotationQuaternion.toEulerAngles()
cylinder12.rotation = new BABYLON.Vector3(cylinder12Euler.x, cylinder12Euler.y, cylinder12Euler.z);
var box02= mesh[8]
box02.physicsImpostor = new BABYLON.PhysicsImpostor(box02, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
box02.checkCollisions = true;
box02.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var box02Euler = box02.rotationQuaternion.toEulerAngles()
box02.rotation = new BABYLON.Vector3(box02Euler.x, box02Euler.y, box02Euler.z);
var box03= mesh[9]
box03.physicsImpostor = new BABYLON.PhysicsImpostor(box03, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
box03.checkCollisions = true;
box03.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var box03Euler = box03.rotationQuaternion.toEulerAngles()
box03.rotation = new BABYLON.Vector3(box03Euler.x, box03Euler.y, box03Euler.z);
var cylinder03= mesh[10]
cylinder03.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder03, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
cylinder03.checkCollisions = true;
cylinder03.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
var cylinder03Euler = cylinder03.rotationQuaternion.toEulerAngles()
cylinder03.rotation = new BABYLON.Vector3(cylinder03Euler.x, cylinder03Euler.y, cylinder03Euler.z);
undefined})
BABYLON.SceneLoader.ImportMesh("", "https://x1.hcm-lab.id:3001/","upload/Box_Modem/Box_Modem.gltf", scene, function (mesh, particle, skeleton) {
var node= mesh[0]
node.position = new BABYLON.Vector3(0, 1, 0);
node.physicsImpostor = new BABYLON.PhysicsImpostor(node, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
node.checkCollisions = true;
node.scaling = new BABYLON.Vector3(1, 1, 1);
var nodeEuler = node.rotationQuaternion.toEulerAngles()
node.rotation = new BABYLON.Vector3(nodeEuler.x, nodeEuler.y, nodeEuler.z);
var Pos0 = .rotation.add(new BABYLON.Vector3(0.00, 0.00, 1.57))
var Rot = .rotation;
var Flag0 = false;
var Observer0 = scene.onAfterRenderObservable.add(function(){
if(.rotation.x.toFixed(2) != Pos0.x.toFixed(2)){
if(.rotation.x < Pos0.x){
Rot.x += 0.01;
}
else if(.rotation.x > Pos0.x){
Rot.x -= 0.01;
}
}
else{Rot.x += 0;
}
if(.rotation.y.toFixed(2) != Pos0.y.toFixed(2)){
if(.rotation.y < Pos0.y){
Rot.y += 0.01;
}
else if(.rotation.y > Pos0.y){
Rot.y -= 0.01;
}
}
else{Rot.y += 0;
}
if(.rotation.z.toFixed(2) != Pos0.z.toFixed(2)){
if(.rotation.z < Pos0.z){
Rot.z += 0.01;
}
else if(.rotation.z > Pos0.z){
Rot.z -= 0.01;
}
}
else{Rot.z += 0;
}
if(.rotation.equalsWithEpsilon(Pos0,0.01)){
Flag0 = true;
}
if(scene.onAfterRenderObservable.hasObservers && Flag0 == true ){
scene.onAfterRenderObservable.remove(Observer0);
}
})

var Pos1 = Pos0.add(new BABYLON.Vector3(0.00, 0.00, 1.57));
var RotFlag1 = false;
var Flag1 = false;
var Observer1 = scene.onAfterRenderObservable.add(function(){
if(.rotation.equalsWithEpsilon(Pos0,0.01)){
RotFlag1 = true;
}
if(RotFlag1 == true){
if(.rotation.x.toFixed(2) != Pos1.x.toFixed(2)){
if(.rotation.x < Pos1.x){
Rot.x += 0.01;
}
else if(.rotation.x > Pos1.x){
Rot.x -= 0.01;
}
}
else{Rot.x += 0;
Flag1[0] = true;}
if(.rotation.y.toFixed(2) != Pos1.y.toFixed(2)){
if(.rotation.y < Pos1.y){
Rot.y += 0.01;
}
else if(.rotation.y > Pos1.y){
Rot.y -= 0.01;
}
}
else{Rot.y += 0;
}
if(.rotation.z.toFixed(2) != Pos1.z.toFixed(2)){
if(.rotation.z < Pos1.z){
Rot.z += 0.01;
}
else if(.rotation.z > Pos1.z){
Rot.z -= 0.01;
}
}
else{Rot.z += 0;
}
if(.rotation.equalsWithEpsilon(Pos1,0.01)){
Flag1 = true;
}
if(scene.onAfterRenderObservable.hasObservers && Flag1 == true ){
scene.onAfterRenderObservable.remove(Observer1);
}
}
})
})
}