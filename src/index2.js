
import { Scene, PerspectiveCamera, WebGLRenderer, Color, AnimationMixer, AnimationClip, PointLight, DirectionalLight, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const scene = new Scene();
scene.background = new Color(0x1c1c1c)


const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 6000);
camera.rotation.y = 4 / 180 * Math.PI;
// camera.rotation.x = 200;
// camera.rotation.z = 1000;
camera.position.set(0, 1, 2);


const dirLight = new DirectionalLight(0xffffff, 0.5);
dirLight.position.set(0, 1, 0);
dirLight.castShadow = true;
scene.add(dirLight);


const light1 = new PointLight(0xc4c4c4, 2);
light1.position.set(0, 500, 500);
scene.add(light1);


const renderer = new WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const animLoader = new FBXLoader();


animLoader.load('models/run.fbx', (fbx) => {

    const controls = new OrbitControls(camera, renderer.domElement);


    fbx.traverse(c => {
        c.castShadow = true;
    });


    const animMixer = new AnimationMixer(fbx);
    const clip = AnimationClip.findByName(fbx.animations, 'mixamo.com');
    const action = animMixer.clipAction(clip)


    action.play();

    scene.add(fbx);

    const clock = new Clock()

    function animate() {
        animMixer.update(clock.getDelta());
        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        controls.update();

    }

    animate()


}, undefined, function (error) {

    console.error(error);

});
