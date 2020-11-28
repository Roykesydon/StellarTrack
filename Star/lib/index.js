let renderer, scene, container;
let test_object, house_obj, plane;
let orbit_camera, camera;
let StatsUI;
let spring_autumn_sun;
let rotateAngle_sas; //spring_autumn_sun's rotateAngle
let light_sas, out_light_sas;
function animate(target) {
    target.rotation.x += 0.01;
    target.rotation.y += 0.01;
}
class house {
    constructor() {
        let ceil_geo = new THREE.Geometry();

        const ceil_material = new THREE.MeshStandardMaterial({
            color: 0x930000,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        ceil_geo.vertices.push(new THREE.Vector3(0, 3, 2.5));
        ceil_geo.vertices.push(new THREE.Vector3(0, 3, -2.5));

        ceil_geo.vertices.push(new THREE.Vector3(3.5, 0, 2.5));
        ceil_geo.vertices.push(new THREE.Vector3(3.5, 0, -2.5));
        ceil_geo.vertices.push(new THREE.Vector3(-3.5, 0, 2.5));
        ceil_geo.vertices.push(new THREE.Vector3(-3.5, 0, -2.5));

        ceil_geo.faces.push(new THREE.Face3(0, 2, 3));
        ceil_geo.faces.push(new THREE.Face3(1, 0, 3));

        ceil_geo.faces.push(new THREE.Face3(0, 5, 4));
        ceil_geo.faces.push(new THREE.Face3(0, 1, 5));

        ceil_geo.faces.push(new THREE.Face3(2, 0, 4));
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
            // side: THREE.DoubleSide,
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
class default_house{
    constructor() {
        let main_geo = new THREE.Geometry();

        const main_material = new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        const scale_tmp = 1.5;

        main_geo.vertices.push(new THREE.Vector3(5*scale_tmp,0*scale_tmp,-7*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(-7*scale_tmp,0*scale_tmp,-7*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(-7*scale_tmp,0*scale_tmp,12*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(0*scale_tmp,0*scale_tmp,12*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(0*scale_tmp,0*scale_tmp,0*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(5*scale_tmp,0*scale_tmp,0*scale_tmp))

        main_geo.vertices.push(new THREE.Vector3(5*scale_tmp,7*scale_tmp,-7*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(-7*scale_tmp,7*scale_tmp,-7*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(-7*scale_tmp,7*scale_tmp,12*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(0*scale_tmp,7*scale_tmp,12*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(0*scale_tmp,7*scale_tmp,0*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(5*scale_tmp,7*scale_tmp,0*scale_tmp))

        main_geo.vertices.push(new THREE.Vector3(5*scale_tmp,11*scale_tmp,-3.5*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(-3.5*scale_tmp,11*scale_tmp,-3.5*scale_tmp))
        main_geo.vertices.push(new THREE.Vector3(-3.5*scale_tmp,11*scale_tmp,12*scale_tmp))

        
        main_geo.faces.push(new THREE.Face3(0, 6, 11));
        main_geo.faces.push(new THREE.Face3(0, 11, 5));

        main_geo.faces.push(new THREE.Face3(0, 1, 6));
        main_geo.faces.push(new THREE.Face3(1, 7, 6));

        main_geo.faces.push(new THREE.Face3(1, 8, 7));
        main_geo.faces.push(new THREE.Face3(1, 2, 8));

        main_geo.faces.push(new THREE.Face3(9,8 ,2 ));
        main_geo.faces.push(new THREE.Face3(3, 9,2 ));

        main_geo.faces.push(new THREE.Face3(3,10 ,9 ));
        main_geo.faces.push(new THREE.Face3(3, 4, 10));

        main_geo.faces.push(new THREE.Face3(4,11 ,10 ));
        main_geo.faces.push(new THREE.Face3(4,5 ,11 ));

        main_geo.faces.push(new THREE.Face3(6, 12, 11));

        main_geo.faces.push(new THREE.Face3(6, 13, 12));
        main_geo.faces.push(new THREE.Face3(6, 7, 13));

        main_geo.faces.push(new THREE.Face3(9, 14, 8));

        main_geo.faces.push(new THREE.Face3(13, 7, 8));
        main_geo.faces.push(new THREE.Face3(13, 8, 14));

        main_geo.faces.push(new THREE.Face3(9,13 ,14 ));
        main_geo.faces.push(new THREE.Face3(9, 10, 13));

        main_geo.faces.push(new THREE.Face3(12, 13, 10));
        main_geo.faces.push(new THREE.Face3(11, 12, 10));

        // main_geo.faces.push(new THREE.Face3(, , ));
        // main_geo.faces.push(new THREE.Face3(, , ));

        main_geo.computeFaceNormals();
        main_geo.computeVertexNormals();
        this.main = new THREE.Mesh(main_geo, main_material);
        this.main.position.set(0, 0, 0);


        let main_ceil_geo = new THREE.Geometry();
        const main_ceil_material = new THREE.MeshStandardMaterial({
            color: 0x880000,
            roughness: 1,
            // side: THREE.DoubleSide,
        });

        main_ceil_geo.vertices.push(new THREE.Vector3(6*scale_tmp,6*scale_tmp,-8*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(6*scale_tmp, 6*scale_tmp,-9*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(5*scale_tmp,11*scale_tmp,-3.5*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(5*scale_tmp,12*scale_tmp,-3.5*scale_tmp))

        main_ceil_geo.faces.push(new THREE.Face3(0, 1, 2));
        main_ceil_geo.faces.push(new THREE.Face3(1, 3, 2));

        main_ceil_geo.vertices.push(new THREE.Vector3(6*scale_tmp,6*scale_tmp,1*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(6*scale_tmp, 6*scale_tmp,2*scale_tmp))

        main_ceil_geo.faces.push(new THREE.Face3(4, 2, 5));
        main_ceil_geo.faces.push(new THREE.Face3(2, 3, 5));


        main_ceil_geo.vertices.push(new THREE.Vector3(-3.5*scale_tmp,11*scale_tmp,-3.5*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(-3.5*scale_tmp, 12*scale_tmp,-3.5*scale_tmp))

        main_ceil_geo.faces.push(new THREE.Face3(0, 2, 6));
        main_ceil_geo.faces.push(new THREE.Face3(4, 6, 2));

        main_ceil_geo.faces.push(new THREE.Face3(1, 7, 3));
        main_ceil_geo.faces.push(new THREE.Face3(5, 3, 7));

        main_ceil_geo.vertices.push(new THREE.Vector3(-8*scale_tmp,6*scale_tmp,-8*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(-9*scale_tmp,6*scale_tmp,-9*scale_tmp))
        

        main_ceil_geo.faces.push(new THREE.Face3(8, 1, 0));
        main_ceil_geo.faces.push(new THREE.Face3(9, 1, 8));
 
        main_ceil_geo.faces.push(new THREE.Face3(9, 7, 1));

        main_ceil_geo.faces.push(new THREE.Face3(0, 6, 8));

        main_ceil_geo.vertices.push(new THREE.Vector3(-8*scale_tmp,6*scale_tmp,13*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(-9*scale_tmp,6*scale_tmp,13*scale_tmp))    

        main_ceil_geo.faces.push(new THREE.Face3(10, 9, 8));
        main_ceil_geo.faces.push(new THREE.Face3(11,9 ,10 ));

        main_ceil_geo.faces.push(new THREE.Face3(11, 7, 9));
        main_ceil_geo.faces.push(new THREE.Face3(10, 6, 8));

        main_ceil_geo.faces.push(new THREE.Face3(10, 11, 9));
        main_ceil_geo.faces.push(new THREE.Face3(10, 9, 8));

        main_ceil_geo.vertices.push(new THREE.Vector3(-3.5*scale_tmp,11*scale_tmp,12*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(-3.5*scale_tmp,12*scale_tmp,12*scale_tmp))

        main_ceil_geo.faces.push(new THREE.Face3(12, 11, 10));
        main_ceil_geo.faces.push(new THREE.Face3(13, 11, 12));

        main_ceil_geo.faces.push(new THREE.Face3(12, 10, 8));
        main_ceil_geo.faces.push(new THREE.Face3(6, 12, 8));

        main_ceil_geo.faces.push(new THREE.Face3(13, 7, 11));

        main_ceil_geo.vertices.push(new THREE.Vector3(1*scale_tmp,6*scale_tmp,13*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(2*scale_tmp,6*scale_tmp,13*scale_tmp))

        main_ceil_geo.faces.push(new THREE.Face3(15, 13, 14));
        main_ceil_geo.faces.push(new THREE.Face3(14, 13, 12));

        main_ceil_geo.faces.push(new THREE.Face3(14, 12, 6));
        main_ceil_geo.faces.push(new THREE.Face3(15, 7, 13));

        main_ceil_geo.vertices.push(new THREE.Vector3(1*scale_tmp,6*scale_tmp,1*scale_tmp))
        main_ceil_geo.vertices.push(new THREE.Vector3(2*scale_tmp,6*scale_tmp,2*scale_tmp))


        main_ceil_geo.faces.push(new THREE.Face3(15, 17, 7));

        main_ceil_geo.faces.push(new THREE.Face3(17, 15, 14));
        main_ceil_geo.faces.push(new THREE.Face3(17, 14, 16));       

        main_ceil_geo.faces.push(new THREE.Face3(5, 7, 17));
 
        main_ceil_geo.faces.push(new THREE.Face3(5, 17, 16));
        main_ceil_geo.faces.push(new THREE.Face3(4, 5, 16)); 


        main_ceil_geo.faces.push(new THREE.Face3(14, 6, 16));
        main_ceil_geo.faces.push(new THREE.Face3(4, 16, 6));  

        main_ceil_geo.computeFaceNormals();
        main_ceil_geo.computeVertexNormals();
        this.main_ceil = new THREE.Mesh(main_ceil_geo, main_ceil_material);
        this.main_ceil.position.set(0, 0, 0);


        let chimney_geo = new THREE.BoxGeometry(2.3*scale_tmp, 5*scale_tmp, 2.5*scale_tmp);
        const chimney_material = new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.chimney = new THREE.Mesh(chimney_geo, chimney_material);
        this.chimney.position.set(-8, 15, 10);

        let door1_geo = new THREE.BoxGeometry(2*scale_tmp, 5*scale_tmp, 1*scale_tmp);
        const door1_material = new THREE.MeshStandardMaterial({
            color: 0x844200,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.door1 = new THREE.Mesh(door1_geo, door1_material);
        this.door1.position.set(-5, 3.5, 17.6);

        let door2_geo = new THREE.BoxGeometry(2*scale_tmp, 5*scale_tmp, 1*scale_tmp);
        const door2_material = new THREE.MeshStandardMaterial({
            color: 0x844200,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.door2 = new THREE.Mesh(door2_geo, door2_material);
        this.door2.position.set(7, 3, -5);
        this.door2.rotation.y=Math.PI*0.5;

        let glass_geo = new THREE.BoxGeometry(2*scale_tmp, 3*scale_tmp, 0.3*scale_tmp);
        const glass_material = new THREE.MeshStandardMaterial({
            color: 0xC4E1FF,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.glass = new THREE.Mesh(glass_geo, glass_material);
        this.glass.position.set(0, 20, 0);
        this.glass.rotation.y=Math.PI*0.5;
        
        let frame_geo = new THREE.Geometry();
        const frame_material = new THREE.MeshStandardMaterial({
            color: 0x844200,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.frame = new THREE.Mesh(frame_geo, frame_material);
        this.frame.position.set(10, 20, 0);
        this.frame.rotation.y=Math.PI*0.5;


        this.house = new THREE.Group();
        this.house.add(this.main);
        this.house.add(this.main_ceil);
        this.house.add(this.chimney);
        this.house.add(this.door1);
        this.house.add(this.door2);
        this.house.add(this.glass);
        this.house.add(this.frame);
        this.house.traverse(function (object) {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
    }
}
class north_pointer {
    constructor() {
        let pointer_geo = new THREE.Geometry();

        const pointer_material = new THREE.MeshBasicMaterial({
            color: 0x930000,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        const scale_tmp = 2.3;
        pointer_geo.vertices.push(
            new THREE.Vector3(3 * scale_tmp, 2 * scale_tmp, 0 * scale_tmp)
        );
        pointer_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 2 * scale_tmp, 0 * scale_tmp)
        );
        pointer_geo.vertices.push(
            new THREE.Vector3(-1.5 * scale_tmp, 2 * scale_tmp, -1.5 * scale_tmp)
        );
        pointer_geo.vertices.push(
            new THREE.Vector3(-1.5 * scale_tmp, 2 * scale_tmp, 1.5 * scale_tmp)
        );

        pointer_geo.vertices.push(
            new THREE.Vector3(3 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );
        pointer_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );
        pointer_geo.vertices.push(
            new THREE.Vector3(-1.5 * scale_tmp, 0 * scale_tmp, -1.5 * scale_tmp)
        );
        pointer_geo.vertices.push(
            new THREE.Vector3(-1.5 * scale_tmp, 0 * scale_tmp, 1.5 * scale_tmp)
        );

        pointer_geo.faces.push(new THREE.Face3(0, 2, 1));
        pointer_geo.faces.push(new THREE.Face3(0, 1, 3));

        pointer_geo.faces.push(new THREE.Face3(4, 5, 3));
        pointer_geo.faces.push(new THREE.Face3(4, 7, 5));

        pointer_geo.faces.push(new THREE.Face3(0, 3, 4));
        pointer_geo.faces.push(new THREE.Face3(4, 3, 7));

        pointer_geo.faces.push(new THREE.Face3(1, 5, 3));
        pointer_geo.faces.push(new THREE.Face3(3, 5, 7));

        pointer_geo.faces.push(new THREE.Face3(1, 6, 5));
        pointer_geo.faces.push(new THREE.Face3(1, 2, 6));

        pointer_geo.faces.push(new THREE.Face3(2, 0, 6));
        pointer_geo.faces.push(new THREE.Face3(6, 0, 4));

        pointer_geo.computeFaceNormals();
        pointer_geo.computeVertexNormals();
        this.pointer = new THREE.Mesh(pointer_geo, pointer_material);
        this.pointer.position.set(0, 0, 0);

        this.pointer.traverse(function (object) {
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

function create_default_house(x = 0, y = 0, z = 0) {
    house_obj = new default_house();
    house_obj.house.position.set(x, y, z);
    scene.add(house_obj.house);
}
function create_pointer(x = 0, y = 0, z = 0) {
    pointer_obj = new north_pointer();
    pointer_obj.pointer.position.set(x, y, z);
    scene.add(pointer_obj.pointer);
}
function create_circle_plane() {
    //r=35
    const planeGeometry = new THREE.CircleGeometry(35, 40);
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x01814A,
        roughness: 1,
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
function create_sun(sun_size, sun_color, x, y) {
    const a = new THREE.SphereGeometry(sun_size);
    const b = new THREE.MeshBasicMaterial({ color: sun_color });
    tmp = new THREE.Mesh(a, b);
    tmp.castShadow = true;
    tmp.position.x = 0;
    tmp.position.y = 0;
    return tmp;
}

function sun_orbit(the_sun) {
    if (rotateAngle_sas > 2 * Math.PI) rotateAngle_sas = 0;
    else rotateAngle_sas += 0.03;
    the_sun.position.z = 33 * Math.cos(rotateAngle_sas);
    the_sun.position.y = 33 * Math.sin(rotateAngle_sas);
    // light_sas.position.copy(the_sun.position);
    light_sas.position.z = 31 * Math.cos(rotateAngle_sas);
    light_sas.position.y = 31 * Math.sin(rotateAngle_sas);

    // out_light_sas.position.z=250*Math.cos(rotateAngle_sas);
    // out_light_sas.position.y=250*Math.sin(rotateAngle_sas);
}
function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    container = document.getElementById("threeJS");

    console.log("container.width= " + container.offsetWidth);
    console.log("container.height= " + container.offsetHeight);
    console.log("circle radius= 35");
    console.log("ground height=-17.5");
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

    // out_light_sas = new THREE.PointLight(0xffffff,1,500);
    // out_light_sas.castShadow=true;
    // scene.add(out_light_sas);
    light_sas = new THREE.PointLight(0xffffff, 1, 200);
    light_sas.castShadow = true;
    scene.add(light_sas);
    spring_autumn_sun = create_sun(2, 0xffdc35, 0, 0);
    scene.add(spring_autumn_sun);
    rotateAngle_sas = 0;

    // let pointLight2 = new THREE.PointLight(0xffffff);
    // pointLight2.position.set(0, 0, 0);
    // pointLight2.castShadow = true;
    // scene.add(pointLight2);
    // let pointLightHelper = new THREE.PointLightHelper(pointLight2)
    // scene.add(pointLightHelper)

    let ambientLight = new THREE.AmbientLight(0x484891, 0.6);
    scene.add(ambientLight);

    //^-----------------------------------------
    create_default_house()
    // create_plane();
    create_circle_plane();
    // create_house(10, -12.5, 0);
    create_pointer(40, -22.5, 0);

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

// init();
// render();
