let renderer, scene, container;
let test_object, house_obj, plane;
let orbit_camera, camera;
let StatsUI;
let spring_autumn_sun;
let rotateAngle_sas;//spring_autumn_sun's rotateAngle
let light_sas;
function animate(target) {
    target.rotation.x += 0.01;
    target.rotation.y += 0.01;
}
class house {
    constructor() {
        let ceil_geo = new THREE.Geometry();

        const ceil_material = new THREE.MeshStandardMaterial({
            color: 0x930000,
            roughness:1,
            side: THREE.DoubleSide,
        });
        ceil_geo.vertices.push(new THREE.Vector3(0, 3, 2.5));
        ceil_geo.vertices.push(new THREE.Vector3(0, 3, -2.5));

        ceil_geo.vertices.push(new THREE.Vector3(3.5, 0, 2.5));
        ceil_geo.vertices.push(new THREE.Vector3(3.5, 0, -2.5));
        ceil_geo.vertices.push(new THREE.Vector3(-3.5, 0, 2.5));
        ceil_geo.vertices.push(new THREE.Vector3(-3.5, 0, -2.5));

        ceil_geo.faces.push(new THREE.Face3(0, 2, 3));
        ceil_geo.faces.push(new THREE.Face3(1, 0, 3));

        ceil_geo.faces.push(new THREE.Face3(0, 4, 5));
        ceil_geo.faces.push(new THREE.Face3(1, 0, 5));

        ceil_geo.faces.push(new THREE.Face3(0, 2, 4));
        ceil_geo.faces.push(new THREE.Face3(1, 3, 5));

        ceil_geo.faces.push(new THREE.Face3(2, 4, 5));
        ceil_geo.faces.push(new THREE.Face3(2, 3, 5));

        ceil_geo.computeFaceNormals();
        ceil_geo.computeVertexNormals();
        this.ceil = new THREE.Mesh(ceil_geo, ceil_material);
        this.ceil.position.set(0, 0, 0);

        let base_geo = new THREE.BoxGeometry(5, 5, 5);
        const base_material = new THREE.MeshPhongMaterial({
            color: 0xffa042,
            side: THREE.DoubleSide,
        });
        this.base = new THREE.Mesh(base_geo, base_material);
        this.base.position.set(0, -2.5, 0);
        this.house = new THREE.Group();
        this.house.add(this.ceil);
        this.house.add(this.base);

        this.house.traverse(function (object) {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
    }
}

function create_house(x = 0, y = 0, z = 0) {
    house_obj = new house();
    house_obj.house.position.set(x, y, z);
    scene.add(house_obj.house);
}
function create_circle_plane() {
    //r=35
    const planeGeometry = new THREE.CircleGeometry(35, 40);
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    let circle_plane = new THREE.Mesh(planeGeometry, planeMaterial);
    circle_plane.rotation.x = -0.5 * Math.PI; // 使平面與 y 軸垂直，並讓正面朝上
    circle_plane.position.set(0, -17.5, 0);

    circle_plane.receiveShadow = true;

    scene.add(circle_plane);
}
function create_ground() {
    //r=35
    const geometry = new THREE.SphereGeometry(
        35,
        40,
        40,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
    );
    const material = new THREE.MeshPhongMaterial({
        color: 0x642100,
        side: THREE.DoubleSide,
    }); // 材質
    let ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = Math.PI;
    ground.position.set(0, -17.5, 0);
    return ground;
}
function create_pack_space() {
    const geometry = new THREE.SphereGeometry(300);
    const material = new THREE.MeshPhongMaterial({
        color: 0x003060,
        side: THREE.DoubleSide,
    }); // 材質
    let space = new THREE.Mesh(geometry, material);
    space.rotation.x = Math.PI;
    space.position.set(0, 0, 0);
    return space;
}
function create_sun(sun_size,sun_color,x,y){
    const a= new THREE.SphereGeometry(sun_size);
    const b = new THREE.MeshBasicMaterial({ color: sun_color ,})
    tmp=new THREE.Mesh(a,b);
    tmp.castShadow=true;
    tmp.position.x=0;
    tmp.position.y=0;
    return tmp;
}
function sun_orbit(the_sun){
    if(rotateAngle_sas>2*Math.PI)
        rotateAngle_sas=0;
    else
        rotateAngle_sas+=0.03;
    the_sun.position.z=33*Math.cos(rotateAngle_sas);
    the_sun.position.y=33*Math.sin(rotateAngle_sas);
    light_sas.position.copy(the_sun.position);
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

    camera.position.set(70, -10, 50); // 位置
    camera.lookAt(scene.position); // 看的位置
    orbit_camera = new THREE.OrbitControls(camera, renderer.domElement);
    orbit_camera.enableDamping = true;
    orbit_camera.dampingFactor = 0.25;
    // orbit_camera.autoRotate=true;

    //------------------light--------------

    light_sas = new THREE.PointLight(0xffffff,1,200);
    light_sas.castShadow=true;
    scene.add(light_sas);
    spring_autumn_sun=create_sun(0.4,0xccffcc,0,0);
    scene.add(spring_autumn_sun);
    rotateAngle_sas=0;

    // let pointLight2 = new THREE.PointLight(0xffffff);
    // pointLight2.position.set(0, 0, 0);
    // pointLight2.castShadow = true;
    // scene.add(pointLight2);
    // let pointLightHelper = new THREE.PointLightHelper(pointLight2)
    // scene.add(pointLightHelper)

    let ambientLight = new THREE.AmbientLight(0x484891, 0.3);
    scene.add(ambientLight);

    //^-----------------------------------------

    // create_plane();
    create_circle_plane();
    create_house(10, -12.5, 0);
    scene.add(create_ground()); //建造地面的半球型
    scene.add(create_pack_space()); //建造一個包住世界的球體

    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    container.appendChild(renderer.domElement);
}
StatsUI = initStats();
// RWD(camera and renderer)
window.addEventListener("resize", function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
});
function initStats() {
    const stats = new Stats();
    stats.setMode(0);
    document.getElementById("stats").appendChild(stats.domElement);
    return stats;
}

function render() {
    // animate(house_obj.house);
    sun_orbit(spring_autumn_sun);
    requestAnimationFrame(render);
    orbit_camera.update();
    StatsUI.update();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = 2;
    renderer.render(scene, camera);
}

init();
render();
