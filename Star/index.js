let renderer, scene, camera, container;
let test_object, house_obj, plane;

function create_test_object() {
    const geometry = new THREE.BoxGeometry(1, 1, 1); // 幾何體
    const material = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
    }); // 材質
    test_object = new THREE.Mesh(geometry, material);
    test_object.position.set(0, 0, 0);
    return test_object;
}

function animate(target) {
    target.rotation.x += 0.01;
    target.rotation.y += 0.01;
}
class house {
    constructor() {
        let ceil_geo = new THREE.Geometry();

        const ceil_material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
        });
        ceil_geo.vertices.push(new THREE.Vector3(0, 5, 0));
        ceil_geo.vertices.push(new THREE.Vector3(-5, 0, 0));
        ceil_geo.vertices.push(new THREE.Vector3(2, 0, 2));
        ceil_geo.vertices.push(new THREE.Vector3(0, 0, -5));

        ceil_geo.faces.push(new THREE.Face3(1, 2, 3));

        ceil_geo.faces.push(new THREE.Face3(0, 1, 2));
        ceil_geo.faces.push(new THREE.Face3(0, 2, 3));
        ceil_geo.faces.push(new THREE.Face3(0, 1, 3));
        ceil_geo.computeFaceNormals();
        ceil_geo.computeVertexNormals();
        this.ceil = new THREE.Mesh(ceil_geo, ceil_material);
        this.ceil.position.set(0, 0, 0);
    }
}
function create_house() {
    house_obj = new house();
    scene.add(house_obj.ceil);
}
function create_plane() {
    const planeGeometry = new THREE.PlaneGeometry(60, 60);
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI; // 使平面與 y 軸垂直，並讓正面朝上
    plane.position.set(0, -7, 0);
    scene.add(plane);
}
function create_ground() {
    const geometry = new THREE.SphereGeometry(35, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2) 
    const material = new THREE.MeshPhongMaterial({
        color: 0xFF9224,
        side: THREE.DoubleSide,
    }); // 材質
    let ground = new THREE.Mesh(geometry, material);
    ground.rotation.x=Math.PI;
    ground.position.set(0, -17.5, 0);
    return ground;
}
function create_pack_space(){
    const geometry = new THREE.SphereGeometry(100) 
    const material = new THREE.MeshPhongMaterial({
        color: 0x46A3FF,
        side: THREE.DoubleSide,
    }); // 材質
    let space = new THREE.Mesh(geometry, material);
    space.rotation.x=Math.PI;
    space.position.set(0, 0, 0);
    return space;
}
function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    container = document.getElementById("threeJS");

    console.log("container.width= " + container.offsetWidth);
    console.log("container.height= " + container.offsetHeight);

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0xeeeeee, 1.0);
    renderer.shadowMap.enable = true;

    camera = new THREE.PerspectiveCamera(
        45, //視角
        container.offsetWidth / container.offsetHeight, //寬高比
        0.1, //最近的渲染距離
        1000 //最遠的渲染距離
    );
    camera.position.set(50, -10, 50); // 位置
    camera.lookAt(scene.position); // 看的位置

    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, -80, 0);
    scene.add(pointLight);
    // let pointLight2 = new THREE.PointLight(0xffffff);
    // pointLight2.position.set(0, 0, 0);
    // scene.add(pointLight2);
    // let ambientLight = new THREE.AmbientLight(0x84C1FF);
    // scene.add(ambientLight);

    // create_plane();
    create_house();
    scene.add(create_test_object());
    scene.add(create_ground());//建造地面的半球型
    scene.add(create_pack_space());//建造一個包住世界的球體
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    container.appendChild(renderer.domElement);
}

// RWD(camera and renderer)
window.addEventListener("resize", function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
});

function render() {
    animate(test_object);
    animate(house_obj.ceil);
    // animate(plane);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
render();
