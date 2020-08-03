var simulation = function(scene){
// Ground 
var plane = BABYLON.MeshBuilder.CreateGround("plane",{height: 100, width: 100},scene);
plane.physicsImpostor = new BABYLON.PhysicsImpostor(plane, BABYLON.PhysicsImpostor.PlaneImpostor, {mass: 0, friction: 0.5}, scene);
plane.checkCollisions = true;
// Object 
BABYLON.SceneLoader.ImportMesh("", "https://x1.hcm-lab.id:3001/","upload/Arm_Robot/Arm_Robot.gltf", scene, function (mesh, particle, skeleton) {
var leftgrip= mesh[0]
leftgrip.position = new BABYLON.Vector3(0, 3, 0);
leftgrip.physicsImpostor = new BABYLON.PhysicsImpostor(leftgrip, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
leftgrip.checkCollisions = true;
leftgrip.scaling = new BABYLON.Vector3(5, 5, 5);
var leftgripEuler = leftgrip.rotationQuaternion.toEulerAngles()
leftgrip.rotation = new BABYLON.Vector3(leftgripEuler.x, leftgripEuler.y, leftgripEuler.z);
var rigthgrip= mesh[1]
rigthgrip.physicsImpostor = new BABYLON.PhysicsImpostor(rigthgrip, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
rigthgrip.checkCollisions = true;
rigthgrip.scaling = new BABYLON.Vector3(5, 5, 5);
var rigthgripEuler = rigthgrip.rotationQuaternion.toEulerAngles()
rigthgrip.rotation = new BABYLON.Vector3(rigthgripEuler.x, rigthgripEuler.y, rigthgripEuler.z);
var part3= mesh[2]
part3.physicsImpostor = new BABYLON.PhysicsImpostor(part3, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
part3.checkCollisions = true;
part3.scaling = new BABYLON.Vector3(5, 5, 5);
var part3Euler = part3.rotationQuaternion.toEulerAngles()
part3.rotation = new BABYLON.Vector3(part3Euler.x, part3Euler.y, part3Euler.z);
var part2= mesh[3]
part2.physicsImpostor = new BABYLON.PhysicsImpostor(part2, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
part2.checkCollisions = true;
part2.scaling = new BABYLON.Vector3(5, 5, 5);
var part2Euler = part2.rotationQuaternion.toEulerAngles()
part2.rotation = new BABYLON.Vector3(part2Euler.x, part2Euler.y, part2Euler.z);
var part1= mesh[4]
part1.physicsImpostor = new BABYLON.PhysicsImpostor(part1, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
part1.checkCollisions = true;
part1.scaling = new BABYLON.Vector3(5, 5, 5);
var part1Euler = part1.rotationQuaternion.toEulerAngles()
part1.rotation = new BABYLON.Vector3(part1Euler.x, part1Euler.y, part1Euler.z);
var part0= mesh[5]
part0.physicsImpostor = new BABYLON.PhysicsImpostor(part0, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
part0.checkCollisions = true;
part0.scaling = new BABYLON.Vector3(5, 5, 5);
var part0Euler = part0.rotationQuaternion.toEulerAngles()
part0.rotation = new BABYLON.Vector3(part0Euler.x, part0Euler.y, part0Euler.z);
var base= mesh[6]
base.physicsImpostor = new BABYLON.PhysicsImpostor(base, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
base.checkCollisions = true;
base.scaling = new BABYLON.Vector3(5, 5, 5);
var baseEuler = base.rotationQuaternion.toEulerAngles()
base.rotation = new BABYLON.Vector3(baseEuler.x, baseEuler.y, baseEuler.z);
// Rotation 
null})
}