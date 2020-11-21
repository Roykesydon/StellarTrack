renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
renderer.shadowMap.enable = true // 陰影效果

// 將渲染器的 DOM 綁到網頁上
let container = document.getElementById("threeJS");
container.appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement)
function init(){
    scene = new THREE.Scene()
}




init();
renderer();