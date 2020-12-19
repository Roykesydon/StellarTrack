let line;
let particles = [];
let renderer, scene, container;
let test_object, house_obj, plane;
let orbit_camera, camera;
let StatsUI;
let spring_autumn_sun;
let rotateAngle_sas; //spring_autumn_sun's rotateAngle
let light_sas, out_light_sas;
let sun_flag = 0;
let sunObj, sun_light;
let sun_rotation_angle;
let sun_la;
let sun_season = 0;
let scene_house;
let ground_plane;
let daylight;
let day_light_flag=0;
function animate(target) {
    target.rotation.x += 0.01;
    target.rotation.y += 0.01;
}
//創建星空
function makeParticles(){
    let particle, material;
    // 創建粒子
    for (let starNum = 0; starNum < 3000; starNum++) {
        // 創建粒子顏色預設白(可修改)
        material = new THREE.SpriteMaterial({
            color: 0xffffff,
        });
        particle = new THREE.Sprite(material);
        //x和y從-100~100 z從-200~200
        particle.position.x = Math.random() * 200 - 100;
        particle.position.y = Math.random() * 200 - 100;
        let Rz=Math.random() * 500 - 250;
        while(Rz<120&&Rz>10) Rz=Math.random() * 400 - 200;
        particle.position.z = Rz;
        // 粒子邊長
        particle.scale.x = particle.scale.y = particle.scale.z=0.05;
        scene.add(particle);
        particles.push(particle);
    }
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
class default_house {
    constructor() {
        let main_geo = new THREE.Geometry();

        const main_material = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        const scale_tmp = 1.5;

        main_geo.vertices.push(
            new THREE.Vector3(5 * scale_tmp, 0 * scale_tmp, -7 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(-7 * scale_tmp, 0 * scale_tmp, -7 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(-7 * scale_tmp, 0 * scale_tmp, 12 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0 * scale_tmp, 12 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(5 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );

        main_geo.vertices.push(
            new THREE.Vector3(5 * scale_tmp, 7 * scale_tmp, -7 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(-7 * scale_tmp, 7 * scale_tmp, -7 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(-7 * scale_tmp, 7 * scale_tmp, 12 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 7 * scale_tmp, 12 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 7 * scale_tmp, 0 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(5 * scale_tmp, 7 * scale_tmp, 0 * scale_tmp)
        );

        main_geo.vertices.push(
            new THREE.Vector3(5 * scale_tmp, 11 * scale_tmp, -3.5 * scale_tmp)
        );
        main_geo.vertices.push(
            new THREE.Vector3(
                -3.5 * scale_tmp,
                11 * scale_tmp,
                -3.5 * scale_tmp
            )
        );
        main_geo.vertices.push(
            new THREE.Vector3(-3.5 * scale_tmp, 11 * scale_tmp, 12 * scale_tmp)
        );

        main_geo.faces.push(new THREE.Face3(0, 6, 11));
        main_geo.faces.push(new THREE.Face3(0, 11, 5));

        main_geo.faces.push(new THREE.Face3(0, 1, 6));
        main_geo.faces.push(new THREE.Face3(1, 7, 6));

        main_geo.faces.push(new THREE.Face3(1, 8, 7));
        main_geo.faces.push(new THREE.Face3(1, 2, 8));

        main_geo.faces.push(new THREE.Face3(9, 8, 2));
        main_geo.faces.push(new THREE.Face3(3, 9, 2));

        main_geo.faces.push(new THREE.Face3(3, 10, 9));
        main_geo.faces.push(new THREE.Face3(3, 4, 10));

        main_geo.faces.push(new THREE.Face3(4, 11, 10));
        main_geo.faces.push(new THREE.Face3(4, 5, 11));

        main_geo.faces.push(new THREE.Face3(6, 12, 11));

        main_geo.faces.push(new THREE.Face3(6, 13, 12));
        main_geo.faces.push(new THREE.Face3(6, 7, 13));

        main_geo.faces.push(new THREE.Face3(9, 14, 8));

        main_geo.faces.push(new THREE.Face3(13, 7, 8));
        main_geo.faces.push(new THREE.Face3(13, 8, 14));

        main_geo.faces.push(new THREE.Face3(9, 13, 14));
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

        main_ceil_geo.vertices.push(
            new THREE.Vector3(6 * scale_tmp, 6 * scale_tmp, -8 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(6 * scale_tmp, 6 * scale_tmp, -9 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(5 * scale_tmp, 11 * scale_tmp, -3.5 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(5 * scale_tmp, 12 * scale_tmp, -3.5 * scale_tmp)
        );

        main_ceil_geo.faces.push(new THREE.Face3(0, 1, 2));
        main_ceil_geo.faces.push(new THREE.Face3(1, 3, 2));

        main_ceil_geo.vertices.push(
            new THREE.Vector3(6 * scale_tmp, 6 * scale_tmp, 1 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(6 * scale_tmp, 6 * scale_tmp, 2 * scale_tmp)
        );

        main_ceil_geo.faces.push(new THREE.Face3(4, 2, 5));
        main_ceil_geo.faces.push(new THREE.Face3(2, 3, 5));

        main_ceil_geo.vertices.push(
            new THREE.Vector3(
                -3.5 * scale_tmp,
                11 * scale_tmp,
                -3.5 * scale_tmp
            )
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(
                -3.5 * scale_tmp,
                12 * scale_tmp,
                -3.5 * scale_tmp
            )
        );

        main_ceil_geo.faces.push(new THREE.Face3(0, 2, 6));
        main_ceil_geo.faces.push(new THREE.Face3(4, 6, 2));

        main_ceil_geo.faces.push(new THREE.Face3(1, 7, 3));
        main_ceil_geo.faces.push(new THREE.Face3(5, 3, 7));

        main_ceil_geo.vertices.push(
            new THREE.Vector3(-8 * scale_tmp, 6 * scale_tmp, -8 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(-9 * scale_tmp, 6 * scale_tmp, -9 * scale_tmp)
        );

        main_ceil_geo.faces.push(new THREE.Face3(8, 1, 0));
        main_ceil_geo.faces.push(new THREE.Face3(9, 1, 8));

        main_ceil_geo.faces.push(new THREE.Face3(9, 7, 1));

        main_ceil_geo.faces.push(new THREE.Face3(0, 6, 8));

        main_ceil_geo.vertices.push(
            new THREE.Vector3(-8 * scale_tmp, 6 * scale_tmp, 13 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(-9 * scale_tmp, 6 * scale_tmp, 13 * scale_tmp)
        );

        main_ceil_geo.faces.push(new THREE.Face3(10, 9, 8));
        main_ceil_geo.faces.push(new THREE.Face3(11, 9, 10));

        main_ceil_geo.faces.push(new THREE.Face3(11, 7, 9));
        main_ceil_geo.faces.push(new THREE.Face3(10, 6, 8));

        main_ceil_geo.faces.push(new THREE.Face3(10, 11, 9));
        main_ceil_geo.faces.push(new THREE.Face3(10, 9, 8));

        main_ceil_geo.vertices.push(
            new THREE.Vector3(-3.5 * scale_tmp, 11 * scale_tmp, 12 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(-3.5 * scale_tmp, 12 * scale_tmp, 12 * scale_tmp)
        );

        main_ceil_geo.faces.push(new THREE.Face3(12, 11, 10));
        main_ceil_geo.faces.push(new THREE.Face3(13, 11, 12));

        main_ceil_geo.faces.push(new THREE.Face3(12, 10, 8));
        main_ceil_geo.faces.push(new THREE.Face3(6, 12, 8));

        main_ceil_geo.faces.push(new THREE.Face3(13, 7, 11));

        main_ceil_geo.vertices.push(
            new THREE.Vector3(1 * scale_tmp, 6 * scale_tmp, 13 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(2 * scale_tmp, 6 * scale_tmp, 13 * scale_tmp)
        );

        main_ceil_geo.faces.push(new THREE.Face3(15, 13, 14));
        main_ceil_geo.faces.push(new THREE.Face3(14, 13, 12));

        main_ceil_geo.faces.push(new THREE.Face3(14, 12, 6));
        main_ceil_geo.faces.push(new THREE.Face3(15, 7, 13));

        main_ceil_geo.vertices.push(
            new THREE.Vector3(1 * scale_tmp, 6 * scale_tmp, 1 * scale_tmp)
        );
        main_ceil_geo.vertices.push(
            new THREE.Vector3(2 * scale_tmp, 6 * scale_tmp, 2 * scale_tmp)
        );

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

        let chimney_geo = new THREE.BoxGeometry(
            2.3 * scale_tmp,
            5 * scale_tmp,
            2.5 * scale_tmp
        );
        const chimney_material = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.chimney = new THREE.Mesh(chimney_geo, chimney_material);
        this.chimney.position.set(-8, 15, 10);

        let door1_geo = new THREE.BoxGeometry(
            2 * scale_tmp,
            5 * scale_tmp,
            1 * scale_tmp
        );
        const door1_material = new THREE.MeshStandardMaterial({
            color: 0x844200,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.door1 = new THREE.Mesh(door1_geo, door1_material);
        this.door1.position.set(-5, 3.5, 17.6);

        let door2_geo = new THREE.BoxGeometry(
            2 * scale_tmp,
            5 * scale_tmp,
            1 * scale_tmp
        );
        const door2_material = new THREE.MeshStandardMaterial({
            color: 0x844200,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.door2 = new THREE.Mesh(door2_geo, door2_material);
        this.door2.position.set(7, 3, -5);
        this.door2.rotation.y = Math.PI * 0.5;

        let glass1_geo = new THREE.BoxGeometry(
            2 * scale_tmp,
            3 * scale_tmp,
            0.3 * scale_tmp
        );
        const glass1_material = new THREE.MeshStandardMaterial({
            color: 0xc4e1ff,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.glass1 = new THREE.Mesh(glass1_geo, glass1_material);
        this.glass1.position.set(-0.2, 5, 7.2);
        this.glass1.rotation.y = Math.PI * 0.5;

        let frame1_geo = new THREE.Geometry();
        const frame1_material = new THREE.MeshStandardMaterial({
            color: 0x844200,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3 * scale_tmp, 0 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3 * scale_tmp, 2 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0 * scale_tmp, 2 * scale_tmp)
        );

        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0.2 * scale_tmp, -0.2 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3.2 * scale_tmp, -0.2 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3.2 * scale_tmp, 2.2 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0.2 * scale_tmp, 2.2 * scale_tmp)
        );

        frame1_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                0.2 * scale_tmp,
                -0.2 * scale_tmp
            )
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                -3.2 * scale_tmp,
                -0.2 * scale_tmp
            )
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                -3.2 * scale_tmp,
                2.2 * scale_tmp
            )
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                0.2 * scale_tmp,
                2.2 * scale_tmp
            )
        );

        frame1_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, -3 * scale_tmp, 0 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, -3 * scale_tmp, 2 * scale_tmp)
        );
        frame1_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, 0 * scale_tmp, 2 * scale_tmp)
        );

        frame1_geo.faces.push(new THREE.Face3(0, 5, 4));
        frame1_geo.faces.push(new THREE.Face3(1, 5, 0));
        frame1_geo.faces.push(new THREE.Face3(6, 5, 1));
        frame1_geo.faces.push(new THREE.Face3(6, 1, 2));
        frame1_geo.faces.push(new THREE.Face3(6, 2, 7));
        frame1_geo.faces.push(new THREE.Face3(2, 3, 7));
        frame1_geo.faces.push(new THREE.Face3(3, 4, 7));
        frame1_geo.faces.push(new THREE.Face3(3, 0, 4));

        frame1_geo.faces.push(new THREE.Face3(14, 15, 3));
        frame1_geo.faces.push(new THREE.Face3(2, 14, 3));
        frame1_geo.faces.push(new THREE.Face3(14, 2, 1));
        frame1_geo.faces.push(new THREE.Face3(1, 13, 14));
        frame1_geo.faces.push(new THREE.Face3(1, 0, 13));
        frame1_geo.faces.push(new THREE.Face3(13, 0, 12));
        frame1_geo.faces.push(new THREE.Face3(0, 3, 12));
        frame1_geo.faces.push(new THREE.Face3(3, 15, 12));

        frame1_geo.faces.push(new THREE.Face3(10, 6, 7));
        frame1_geo.faces.push(new THREE.Face3(10, 7, 11));
        frame1_geo.faces.push(new THREE.Face3(7, 8, 11));
        frame1_geo.faces.push(new THREE.Face3(7, 4, 8));
        frame1_geo.faces.push(new THREE.Face3(6, 10, 9));
        frame1_geo.faces.push(new THREE.Face3(5, 6, 9));
        frame1_geo.faces.push(new THREE.Face3(8, 4, 5));
        frame1_geo.faces.push(new THREE.Face3(9, 8, 5));

        this.frame1 = new THREE.Mesh(frame1_geo, frame1_material);
        this.frame1.position.set(0.3, 7.23, 5.5);

        let glass2_geo = new THREE.BoxGeometry(
            2 * scale_tmp,
            3 * scale_tmp,
            0.3 * scale_tmp
        );
        const glass2_material = new THREE.MeshStandardMaterial({
            color: 0xc4e1ff,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        this.glass2 = new THREE.Mesh(glass2_geo, glass2_material);
        this.glass2.position.set(-0.2, 5, 13.2);
        this.glass2.rotation.y = Math.PI * 0.5;

        let frame2_geo = new THREE.Geometry();
        const frame2_material = new THREE.MeshStandardMaterial({
            color: 0x844200,
            roughness: 1,
            // side: THREE.DoubleSide,
        });
        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3 * scale_tmp, 0 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3 * scale_tmp, 2 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0 * scale_tmp, 2 * scale_tmp)
        );

        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0.2 * scale_tmp, -0.2 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3.2 * scale_tmp, -0.2 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, -3.2 * scale_tmp, 2.2 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(0 * scale_tmp, 0.2 * scale_tmp, 2.2 * scale_tmp)
        );

        frame2_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                0.2 * scale_tmp,
                -0.2 * scale_tmp
            )
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                -3.2 * scale_tmp,
                -0.2 * scale_tmp
            )
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                -3.2 * scale_tmp,
                2.2 * scale_tmp
            )
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(
                -0.5 * scale_tmp,
                0.2 * scale_tmp,
                2.2 * scale_tmp
            )
        );

        frame2_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, 0 * scale_tmp, 0 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, -3 * scale_tmp, 0 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, -3 * scale_tmp, 2 * scale_tmp)
        );
        frame2_geo.vertices.push(
            new THREE.Vector3(-0.5 * scale_tmp, 0 * scale_tmp, 2 * scale_tmp)
        );

        frame2_geo.faces.push(new THREE.Face3(0, 5, 4));
        frame2_geo.faces.push(new THREE.Face3(1, 5, 0));
        frame2_geo.faces.push(new THREE.Face3(6, 5, 1));
        frame2_geo.faces.push(new THREE.Face3(6, 1, 2));
        frame2_geo.faces.push(new THREE.Face3(6, 2, 7));
        frame2_geo.faces.push(new THREE.Face3(2, 3, 7));
        frame2_geo.faces.push(new THREE.Face3(3, 4, 7));
        frame2_geo.faces.push(new THREE.Face3(3, 0, 4));

        frame2_geo.faces.push(new THREE.Face3(14, 15, 3));
        frame2_geo.faces.push(new THREE.Face3(2, 14, 3));
        frame2_geo.faces.push(new THREE.Face3(14, 2, 1));
        frame2_geo.faces.push(new THREE.Face3(1, 13, 14));
        frame2_geo.faces.push(new THREE.Face3(1, 0, 13));
        frame2_geo.faces.push(new THREE.Face3(13, 0, 12));
        frame2_geo.faces.push(new THREE.Face3(0, 3, 12));
        frame2_geo.faces.push(new THREE.Face3(3, 15, 12));

        frame2_geo.faces.push(new THREE.Face3(10, 6, 7));
        frame2_geo.faces.push(new THREE.Face3(10, 7, 11));
        frame2_geo.faces.push(new THREE.Face3(7, 8, 11));
        frame2_geo.faces.push(new THREE.Face3(7, 4, 8));
        frame2_geo.faces.push(new THREE.Face3(6, 10, 9));
        frame2_geo.faces.push(new THREE.Face3(5, 6, 9));
        frame2_geo.faces.push(new THREE.Face3(8, 4, 5));
        frame2_geo.faces.push(new THREE.Face3(9, 8, 5));

        this.frame2 = new THREE.Mesh(frame2_geo, frame2_material);
        this.frame2.position.set(0.3, 7.23, 11.5);

        this.house = new THREE.Group();
        this.house.add(this.main);
        this.house.add(this.main_ceil);
        this.house.add(this.chimney);
        this.house.add(this.door1);
        this.house.add(this.door2);
        this.house.add(this.glass1);
        this.house.add(this.frame1);
        this.house.add(this.frame2);
        this.house.add(this.glass2);
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

function createline(x) {
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const points = [];
    x1 = 50 * Math.cos((x / 180) * Math.PI);
    x2 = -50 * Math.cos((x / 180) * Math.PI);
    y1 = 50 * Math.sin((x / 180) * Math.PI) - 17.5;
    y2 = -50 * Math.sin((x / 180) * Math.PI) - 17.5;
    points.push(new THREE.Vector3(x1, y1, 0));
    points.push(new THREE.Vector3(x2, y2, 0));
    const geometry = new THREE.Geometry().setFromPoints(points);
    line = new THREE.Line(geometry, material);
    scene.add(line);
}
function remove_line() {
    scene.remove(line);
}
function create_house(x = 0, y = 0, z = 0) {
    house_obj = new house();
    house_obj.house.position.set(x, y, z);
    scene.add(house_obj.house);
}
function remove_house() {
    scene.remove(scene_house);
}
function create_default_house(x = 0, y = 0, z = 0) {
    house_obj = new default_house();
    house_obj.house.position.set(x, y, z);
    scene_house = house_obj.house;
    scene.add(scene_house);
}
function create_pointer(x = 0, y = 0, z = 0) {
    pointer_obj = new north_pointer();
    pointer_obj.pointer.position.set(x, y, z);
    scene.add(pointer_obj.pointer);
}
function remove_ground() {
    scene.remove(ground_plane);
}
function create_circle_plane() {
    //r=35
    const planeGeometry = new THREE.CircleGeometry(35, 40);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x01814a,
        roughness: 1,
        side: THREE.DoubleSide,
    });
    let circle_plane = new THREE.Mesh(planeGeometry, planeMaterial);
    circle_plane.rotation.x = -0.5 * Math.PI; // 使平面與 y 軸垂直，並讓正面朝上
    circle_plane.position.set(0, -17.5, 0);

    circle_plane.receiveShadow = true;
    ground_plane = circle_plane;
    scene.add(ground_plane);
}
function create_taipei_plane() {
    //r=35
    const planeGeometry = new THREE.CircleGeometry(35, 40);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x8E8E8E,
        roughness: 1,
        side: THREE.DoubleSide,
    });
    let circle_plane = new THREE.Mesh(planeGeometry, planeMaterial);
    circle_plane.rotation.x = -0.5 * Math.PI; // 使平面與 y 軸垂直，並讓正面朝上
    circle_plane.position.set(0, -17.5, 0);

    circle_plane.receiveShadow = true;
    ground_plane = circle_plane;
    scene.add(ground_plane);
}
function create_england_plane() {
    //r=35
    const planeGeometry = new THREE.CircleGeometry(35, 40);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x97CBFF,
        roughness: 1,
        side: THREE.DoubleSide,
    });
    let circle_plane = new THREE.Mesh(planeGeometry, planeMaterial);
    circle_plane.rotation.x = -0.5 * Math.PI; // 使平面與 y 軸垂直，並讓正面朝上
    circle_plane.position.set(0, -17.5, 0);

    circle_plane.receiveShadow = true;
    ground_plane = circle_plane;
    scene.add(ground_plane);
}
function create_egypt_plane() {
    //r=35
    const planeGeometry = new THREE.CircleGeometry(35, 40);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFAF60,
        roughness: 1,
        side: THREE.DoubleSide,
    });
    let circle_plane = new THREE.Mesh(planeGeometry, planeMaterial);
    circle_plane.rotation.x = -0.5 * Math.PI; // 使平面與 y 軸垂直，並讓正面朝上
    circle_plane.position.set(0, -17.5, 0);

    circle_plane.receiveShadow = true;
    ground_plane = circle_plane;
    scene.add(ground_plane);
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
function remove_sun() {
    scene.remove(sunObj);
    scene.remove(sun_light);
    sun_flag = 0;
}
function sun_orbit(the_sun, the_light) {
    if (!sun_flag) return;
    if (sun_rotation_angle > 2 * Math.PI) sun_rotation_angle = 0;
    else sun_rotation_angle += 0.03;
    the_sun.position.z = 27 * Math.cos(sun_rotation_angle);
    the_sun.position.y =
        27 * Math.sin(sun_rotation_angle) * Math.cos((sun_la / 180) * Math.PI) -
        17.5;
    // light_sas.position.copy(the_sun.position);
    if(sun_light_flag){
        the_light.position.z = 25 * Math.cos(sun_rotation_angle);
        the_light.position.y =
            25 * Math.sin(sun_rotation_angle) * Math.cos((sun_la / 180) * Math.PI) -
            17.5;
    }
    the_sun.position.x =
        -27 * Math.sin(sun_rotation_angle) * Math.sin((sun_la / 180) * Math.PI);
    if(sun_light_flag){
        the_light.position.x =
            -25 * Math.sin(sun_rotation_angle) * Math.sin((sun_la / 180) * Math.PI);
    }
    // the_sun.position.x = -27 * Math.sin(sun_rotation_angle);
    // the_light.position.x = -25 * Math.sin(sun_rotation_angle);
    if (sun_season == 1) {
        console.log("summer");
        the_sun.position.x += 10 * Math.cos((sun_la / 180) * Math.PI);
        the_sun.position.y += 10 * Math.sin((sun_la / 180) * Math.PI);
        if(sun_light_flag){
            the_light.position.x += 10 * Math.cos((sun_la / 180) * Math.PI);
            the_light.position.y += 10 * Math.sin((sun_la / 180) * Math.PI);
        }
    }
    if (sun_season == 2) {
        console.log("winter");
        the_sun.position.x -= 10 * Math.cos((sun_la / 180) * Math.PI);
        the_sun.position.y -= 10 * Math.sin((sun_la / 180) * Math.PI);
        if(sun_light_flag){
            the_light.position.x -= 10 * Math.cos((sun_la / 180) * Math.PI);
            the_light.position.y -= 10 * Math.sin((sun_la / 180) * Math.PI);
        }
    }
    if(the_sun.position.y>-17.5&& sun_light_flag==0){
        sun_light = new THREE.PointLight(0xffffff, 1, 200);
        sun_light.castShadow = true;
        scene.add(sun_light);
        sun_light_flag=1;
    }
    if(the_sun.position.y<-17.5&& sun_light_flag==1){
        scene.remove(sun_light);
        sun_light_flag=0;
    }
    // console.log('sun_la= '+sun_la);
    // out_light_sas.position.z=250*Math.cos(sun_rotation_angle);
    // out_light_sas.position.y=250*Math.sin(sun_rotation_angle);
}
function create_taipei_house() {
    var onProgress = function (xhr) {
    };

    var onError = function (xhr) {};
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath("./building/");
    mtlLoader.load("taipei.mtl", function (materials) {
        materials.preload();
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("./building/");
        objLoader.load(
            "taipei.obj",
            function (object) {
                object.position.y = -17.5;
                object.position.x=-3;
                object.position.z=3;
                object.scale.set(0.4, 0.4, 0.4);

                object.traverse(function (obj) {
                    if (obj instanceof THREE.Mesh) {
                        obj.castShadow = true;
                        obj.receiveShadow = true;
                        obj.roughness=1.0;
                    }
                });

                console.log("taipei19:12");
                scene_house = object;
                scene.add(scene_house);
            },
            onProgress,
            onError
        );
    });
}
function create_england_house() {
    var onProgress = function (xhr) {
    };

    var onError = function (xhr) {};
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath("./building/");
    mtlLoader.load("bigben.mtl", function (materials) {
        materials.preload();
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("./building/");
        objLoader.load(
            "bigben.obj",
            function (object) {
                object.position.y = -17.5;
                object.position.x=1;
                object.position.z=18;
                object.scale.set(0.5, 0.5, 0.5);

                object.traverse(function (obj) {
                    if (obj instanceof THREE.Mesh) {
                        obj.castShadow = true;
                        obj.receiveShadow = true;
                        // obj.roughness=1.0;
                    }
                });

                console.log("bigben00:57");
                scene_house = object;
                scene.add(scene_house);
            },
            onProgress,
            onError
        );
    });
}
function create_egypt_house() {
    var onProgress = function (xhr) {
    };

    var onError = function (xhr) {};
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath("./building/");
    mtlLoader.load("egypt.mtl", function (materials) {
        materials.preload();
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("./building/");
        objLoader.load(
            "egypt.obj",
            function (object) {
                object.position.y = -17.5;
                object.position.x=1;
                object.position.z=18;
                object.scale.set(0.5, 0.5, 0.5);

                object.traverse(function (obj) {
                    if (obj instanceof THREE.Mesh) {
                        obj.castShadow = true;
                        obj.receiveShadow = true;
                        // obj.roughness=1.0;
                    }
                });

                console.log("egypt13:42");
                scene_house = object;
                scene.add(scene_house);
            },
            onProgress,
            onError
        );
    });
}
function switch_day_light(){
    if(!sun_flag)return;
    if(sunObj.position.y>-17.5){
        scene.remove(daylight);
        let tmp = new THREE.AmbientLight(0x66B3FF, 1.5*Math.sin(sun_rotation_angle));
        daylight=tmp;
        scene.add(daylight);
    }
    if(sunObj.position.y<-17.5){
        scene.remove(daylight);
    }
}
function create_sun(la, season, city) {
    console.log("season " + season);
    let sun_size = 2;
    let sun_color = 0xffdc35;
    // sun_season=0//0 = spring 1 =summer 2=winter
    sun_season = season;

    const a = new THREE.SphereGeometry(sun_size);
    const b = new THREE.MeshBasicMaterial({ color: sun_color });
    sunObj = new THREE.Mesh(a, b);
    // sunObj.castShadow = true;
    sunObj.castShadow = false;
    sunObj.position.x = 0;
    sunObj.position.y = 0;
    scene.add(sunObj);
    sun_flag = 1;

    sun_light = new THREE.PointLight(0xffffff, 1, 200);
    sun_light.castShadow = true;

    scene.add(sun_light);
    sun_light_flag=1;
    sun_la = la;
    sun_rotation_angle = 0;

    sun_orbit(sunObj, sun_light, la);
    if (city == "default") {
        create_default_house(2, -17.5, -2);
        create_circle_plane();
    }
    if (city == "Taiwan") {
        create_taipei_house();
        create_taipei_plane();
    }
    // if (city == "America") {
    //     create_default_house(2, -17.5, -2);
    //     create_circle_plane();
    // }
    if (city == "England") {
        create_england_house();
        create_england_plane();
    }
    if (city == "Egypt") {
        create_egypt_house();
        create_egypt_plane();
    }
    // if (city == "Singapore") {
    //     create_default_house(2, -17.5, -2);
    //     create_circle_plane();
    // }
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
        700 //最遠的渲染距離
    );
    camera.position.set(30, 20, 120); // 位置
    camera.lookAt(scene.position); // 看的位置
    orbit_camera = new THREE.OrbitControls(camera, renderer.domElement);
    orbit_camera.enableDamping = true;
    orbit_camera.dampingFactor = 0.25;
    // orbit_camera.autoRotate=true;

    //------------------light--------------
    // out_light_sas = new THREE.PointLight(0xffffff,1,500);
    // out_light_sas.castShadow=true;
    // scene.add(out_light_sas);

    // let pointLight2 = new THREE.PointLight(0xffffff);
    // pointLight2.position.set(0, 0, 0);
    // pointLight2.castShadow = true;
    // scene.add(pointLight2);
    // let pointLightHelper = new THREE.PointLightHelper(pointLight2)
    // scene.add(pointLightHelper)

    let ambientLight = new THREE.AmbientLight(0x484891, 0.6);
    scene.add(ambientLight);

    //^-----------------------------------------
    create_default_house(2, -17.5, -2);
    makeParticles();
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
    sun_orbit(sunObj, sun_light);
    requestAnimationFrame(render);
    switch_day_light();
    orbit_camera.update();
    StatsUI.update();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = 2;
    renderer.render(scene, camera);
}
