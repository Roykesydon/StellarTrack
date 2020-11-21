let renderer, scene, camera, container;
let test_object;

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

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    container = document.getElementById("threeJS");
    console.log("container.width= " + container.offsetWidth);
    console.log("container.height= " + container.offsetHeight);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0xccccee, 1.0);
    renderer.shadowMap.enable = true;

    camera = new THREE.PerspectiveCamera(
        45, //視角
        container.offsetWidth / container.offsetHeight, //寬高比
        0.1, //最近的渲染距離
        100 //最遠的渲染距離
    );
    camera.position.set(10, 10, 10); // 位置
    camera.lookAt(scene.position); // 看的位置

    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(10, 10, -10);
    scene.add(pointLight);

    scene.add(create_test_object());

    container.appendChild(renderer.domElement);
}
window.addEventListener("resize", function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
});
function render(){
    animate(test_object);
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}



init();
render();
