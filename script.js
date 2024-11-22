import * as THREE from "three";
import { Tween, Easing } from "https://unpkg.com/@tweenjs/tween.js@25.0.0/dist/tween.esm.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";


// Scene and Camera
const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });
camera.position.set(3, 20, 60);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

// Raycaster for click detection
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Load a laboratory background
const labTexture = new THREE.TextureLoader().load('backgroundbis.png');
scene.background = labTexture;

// Load environment texture
const equirectLoader = new RGBELoader();
let textureEquirec;

const labGroup = new THREE.Group();
scene.add(labGroup);

// Load STL model (becher)
let becherMesh;
let movingCylinder;
let becher = new THREE.Group();
const stlLoader1 = new STLLoader();
stlLoader1.load('becher.stl', (geometry) => {
    const material = new THREE.MeshPhysicalMaterial({
        clearcoat: 0.3,
        clearcoatRoughness: 0.25,
        color: 0x88ccff,
        envMap: textureEquirec,
        envMapIntensity: 1.0,
        ior: 1.25,
        iridescence: 0.8,
        metalness: 0,
        roughness: 0.2,
        thickness: 5.0,
        transmission: 1.0,
        transparent: true,
        opacity: 0.7
    });
    becherMesh = new THREE.Mesh(geometry, material);
    becherMesh.scale.set(0.05, 0.05, 0.05);

    // Create the moving cylinder inside the becher
    const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 4, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    movingCylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    movingCylinder.position.set(0, 2.3, 0);
    movingCylinder.scale.set(1, 1, 1);
    becher.add(movingCylinder);
    becher.add(becherMesh);

    becher.position.set(-5, 0, 10);
    becher.rotation.set(0, 0, -2);
    becher.name = "filledBecher"
    labGroup.add(becher);
}, undefined, (error) => {
    console.error(error);
});

let mushroomMesh;
const stlLoader3 = new STLLoader();
stlLoader3.load('mushroom.stl', (geometry) => {
    const mushroomMaterial = new THREE.MeshStandardMaterial({ color: 0xA52A2A, roughness: 0.4, metalness: 0.1 });
    mushroomMesh = new THREE.Mesh(geometry, mushroomMaterial);
    mushroomMesh.scale.set(1, 1, 1);
    mushroomMesh.position.set(10, -5, 10); 
    mushroomMesh.rotation.set(-1.5, 0, 0);
    labGroup2.add(mushroomMesh);
    scene.add(labGroup2); 
}, undefined, (error) => {
    console.error(error);
});

let knifeMesh;
const stlLoader4 = new STLLoader();
stlLoader3.load('knife.stl', (geometry) => {
    const knifeMaterial = new THREE.MeshStandardMaterial({ color: 0x505050});
    knifeMesh = new THREE.Mesh(geometry, knifeMaterial);
    knifeMesh.scale.set(1.5, 1.5, 1.5);
    knifeMesh.position.set(10, 0, 25);
    knifeMesh.rotation.set(-1.5, 0.5, 0);
    labGroup3.add(knifeMesh);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('leather.jpg', (texture) => {
        const squareGeometry = new THREE.PlaneGeometry(10, 10); 
        const squareMaterial = new THREE.MeshPhysicalMaterial({ map: texture, ior:1, 
        });
        squareMaterial.roughness = 1
        const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
        squareMesh.position.set(1, 6, 24.5); 
        squareMesh.rotation.set = (-1.5, 0.5, 1); 
        labGroup3.add(squareMesh); 
    });
    
    const whiteGeometry = new THREE.CircleGeometry(2, 32); 
    const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, opacity: 0.6, transparent: false }); 
    let whiteCircle = new THREE.Mesh(whiteGeometry, whiteMaterial);
    whiteCircle.position.set(0.5, -6, 24.5); 
    whiteCircle.rotation.x = -Math.PI / 2; 
    labGroup3.add(whiteCircle); 
    scene.add(labGroup3); 
}, undefined, (error) => {
    console.error(error);
});


// Load STL model (Petri)
let petriMesh;
const stlLoader2 = new STLLoader();
stlLoader2.load('petribis.stl', (geometry) => {
    const material = new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
        metalness: 0.2
    });
    petriMesh = new THREE.Mesh(geometry, material);
    petriMesh.scale.set(0.5, 0.5, 0.5);
    petriMesh.position.set(2, -7, 22);
    petriMesh.rotation.set(-8, 0, 1);
    labGroup.add(petriMesh);
}, undefined, (error) => {
    console.error(error);
});

// Circle for simulating poured liquid in the Petri dish
let liquidCircle;
function createLiquidCircle() {
    const circleGeometry = new THREE.CircleGeometry(2, 32);
    const circleMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, opacity: 0.6, transparent: true });
    liquidCircle = new THREE.Mesh(circleGeometry, circleMaterial);
    liquidCircle.position.set(0.5, -6, 24.5);
    liquidCircle.rotation.x = -Math.PI / 2; 
    labGroup.add(liquidCircle);
}


// Add ambient and directional light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Load GLB model for the table
const gltfLoader = new GLTFLoader();
let tableModel;
gltfLoader.load('table.gltf', (gltf) => {
    tableModel = gltf.scene;
    tableModel.position.set(10, -20, 50); 
    tableModel.scale.set(0.1, 0.1, 0.1); 
    tableModel.rotation.set(0,-1.5,0);
    tableModel.traverse((child) => {
        if(child.isMesh) {
            child.material.color.set(0xD3D3D3);
        }
    })
    tableModel.name = "table";
    labGroup.add(tableModel);
    console.log(tableModel);
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle GLB:', error);
});

let labGroup2 = new THREE.Group();
let labGroup3 = new THREE.Group();
let moveNewTable;
let moveNewTable2;


const petriShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
        iTime: { value: 0 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        #define AA 2

        uniform vec3 iResolution;
        uniform float iTime;
        varying vec2 vUv;

        vec3 shape(in vec2 uv) {
            float time = iTime * 0.05 + 47.0;
            vec2 z = -1.0 + 2.0 * uv;
            z *= 1.5;

            vec3 col = vec3(1.0);
            for (int j = 0; j < 48; j++) {
                float s = float(j) / 16.0;
                float f = 0.2 * (0.5 + 1.0 * fract(sin(s * 20.0)));
                vec2 c = 0.5 * vec2(cos(f * time + 17.0 * s), sin(f * time + 19.0 * s));
                z -= c;
                float zr = length(z);
                float ar = atan(z.y, z.x) + zr * 0.6;
                z = vec2(cos(ar), sin(ar)) / zr;
                z += c;
                
                col -= 0.5 * exp(-10.0 * dot(z, z)) * (0.25 + 0.4 * sin(5.5 + 1.5 * s + vec3(1.6, 0.8, 0.5)));
            }
            return col;
        }

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            float e = 1.0 / iResolution.x;
            vec3 tot = vec3(0.0);
            for (int m = 0; m < AA; m++) {
                for (int n = 0; n < AA; n++) {
                    vec2 uv = (fragCoord + vec2(m, n) / float(AA)) / iResolution.xy;
                    vec3 col = shape(uv);
                    float f = dot(col, vec3(0.333));
                    vec3 nor = normalize(vec3(
                        dot(shape(uv + vec2(e, 0.0)), vec3(0.333)) - f,
                        dot(shape(uv + vec2(0.0, e)), vec3(0.333)) - f,
                        e
                    ));
                    col += 0.2 * vec3(1.0, 0.9, 0.5) * dot(nor, vec3(0.8, 0.4, 0.2));
                    col += 0.3 * nor.z;
                    tot += col;
                }
            }
            tot /= float(AA * AA);

            tot = pow(clamp(tot, 0.0, 1.0), vec3(0.8, 1.1, 1.3));
            vec2 uv = fragCoord / iResolution.xy;
            tot *= 0.4 + 0.6 * pow(16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y), 0.1);

            fragColor = vec4(tot, 1.0);
        }

        void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            mainImage(gl_FragColor, fragCoord);
        }
    `
});


// Create Petri dish with shader on the second table
let petriShaderMesh;
const createPetriShaderMesh = () => {
    const geometry = new THREE.CircleGeometry(2, 32);
    petriShaderMesh = new THREE.Mesh(geometry, petriShaderMaterial);
    petriShaderMesh.position.set(0.5, -6, 24.5);
    petriShaderMesh.rotation.x = -Math.PI / 2;
    labGroup2.add(petriShaderMesh);
};


setTimeout(() => {
    createPetriShaderMesh();


    labGroup.children.forEach(child => {
        if (child.name != "filledBecher") {
            let clone1 = child.clone();
            clone1.name = clone1.name + "_2";
            labGroup2.add(clone1);
            let clone2 = child.clone();
            clone2.name = clone1.name + "_3";
            labGroup3.add(clone2);
        }
    });

    labGroup2.position.x = -150;
    scene.add(labGroup2);
    labGroup3.position.x = -250;
    scene.add(labGroup3);

    // Animation to move in the new table
    moveNewTable = new Tween(labGroup2.position)
        .to({ x: 0 }, 1000)
        .easing(Easing.Quadratic.Out);
    
    moveNewTable2 = new Tween(labGroup3.position)
        .to({ x: 0 }, 1000)
        .easing(Easing.Quadratic.Out);
}, 2000);


// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

let clock = new THREE.Clock();

let textGroup = new THREE.Group();
scene.add(textGroup);

const loader = new FontLoader();
loader.load(
    './fonts/helvetiker_bold.typeface.json', // Remplace par ton chemin relatif
    function (font) {
            // Textes à afficher lors des différents clics
            const texts = [
                "Etape 1 : Preparation du substrat :\nMelanger 300ml d'eau distillee\navec 2g de yeast et 4g de malt.\nVerser la preparation (cliquer\nsur le becher) dans un recipient\npour steriliser cette derniere.", // Texte initial
                "Etape 2 : Inoculation du substrat :\nVerser le melange prepare dans\nles boites de Petri et ajouter\nles spores de champignon.\nLaisser incuber dans un endroit\nsombre et humide.", // Nouveau texte
                "Etape 3 : Traitement de la pate :\nUne fois la culture bien formee,\nprelever la pate et la secher.\nTraiter la pate pour obtenir\nla texture du cuir." // Autre texte
            ];
        let currentStep = 0;
        let currentIndex = 0;
        let displayedText = ""; // Texte affiché progressivement
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0x00000 }); // Couleur blanche pour le texte
        const initialPosition = { x: -14, y: 18, z: 0 }; // Position initiale du texte à droite


        // Fonction pour mettre à jour le texte
        function updateText(currentText) {
            // Supprimer le texte précédent si existe
            const existingText = scene.getObjectByName('dynamicText');
            if (existingText) {
                scene.remove(existingText);
            }

            // Créer une nouvelle géométrie pour le texte actuel
            const textGeometry = new TextGeometry(currentText, {
                font: font,
                size: 1.3,
                height: 0.2,
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
            textMesh.name = 'dynamicText'; // Attribuer un nom pour l'identifier
            scene.add(textMesh);
        }

        function animateText() {
            if (currentIndex <= texts[currentStep].length) {
                displayedText = texts[currentStep].substring(0, currentIndex); // Portion de texte à afficher
                updateText(displayedText); // Mettre à jour l'affichage
                currentIndex++;
                setTimeout(animateText, 100); // Afficher la prochaine lettre dans 200ms
            }
        }

        // Lancer l'animation du texte initial
        animateText();

const moveText = new Tween(textGroup.position)
.to({ x: 100 }, 1000) 
.easing(Easing.Quadratic.Out);

    // Animation to move out the first table
const moveTable = new Tween(labGroup.position)
.to({ x: 100 }, 1000) // Move the original table out to the right
.easing(Easing.Quadratic.Out)
.onComplete(() => {
    // Start the new table's animation once the original table has moved out
    moveNewTable.start();
    moveText.start();
    isMovingTable = false;
});

const moveTable2 = new Tween(labGroup2.position)
.to({ x: 100 }, 1000) // Move the original table out to the right
.easing(Easing.Quadratic.Out)
.onComplete(() => {
    // Start the new table's animation once the original table has moved out
    moveNewTable2.start();
    moveText.start();
    isMovingTable = false;
});
// Variable d'état pour savoir si l'animation de la table est en cours
let isMovingTable = false;

// Handle mouse click for interaction with the moving cylinder and table
window.addEventListener('click', (event) => {
pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

raycaster.setFromCamera(pointer, camera);

// Check for intersection with the moving cylinder
const intersectsCylinder = raycaster.intersectObject(movingCylinder);
if (intersectsCylinder.length > 0) {
    movingCylinder.visible = false; // Hide the cylinder
    createLiquidCircle(); // Create liquid circle in Petri dish
}

// Check for intersection with the table
if (tableModel) {
    const intersectsTable = raycaster.intersectObject(tableModel);
    if (intersectsTable.length > 0 && !isMovingTable) {
        isMovingTable = true; // Mark that the table animation has started
        moveTable.start();
        moveText.start();

        currentStep = (currentStep + 1) % texts.length; // Passer à l'étape suivante
        currentIndex = 0; // Réinitialiser l'index du texte
        animateText(); // Animer le texte suivant
    }
}

let table2 = labGroup2.children.find((child) => child.name == 'table_2');
if (table2) {
    const intersectsTable = raycaster.intersectObject(table2);
    console.log(intersectsTable)
    if (intersectsTable.length > 0 && !isMovingTable) {
        isMovingTable = true; // Mark that the table animation has started
        moveTable2.start();
        moveText.start();

        currentStep = (currentStep + 1) % texts.length; // Passer à l'étape suivante
        currentIndex = 0; // Réinitialiser l'index du texte
        animateText(); // Animer le texte suivant
    }
}
});


        // Boucle d'animation principale pour rendre la scène
        function animate() {
            requestAnimationFrame(animate);

            // Animation du texte (ajoutée dans la boucle d'animation principale)
            let time = clock.getElapsedTime();
            
            // Mise à jour des autres animations
            petriShaderMaterial.uniforms.iTime.value = time;
            if (moveNewTable) moveNewTable.update();
            if (moveTable) moveTable.update();
            if (moveNewTable2) moveNewTable2.update();
            if (moveTable2) moveTable2.update();
            if (moveText) moveText.update();

            // Animations supplémentaires
            if (becher) {
                becher.position.y += Math.sin(time * 2) * 0.05; // Flottement vertical
            }
            if (mushroomMesh) {
                mushroomMesh.rotation.z += 0.01; // Rotation légère
            }

            controls.update(); // Mise à jour des contrôles
            renderer.render(scene, camera); // Rendu
        }

        animate(); // Démarre l'animation

        // Vérification du contenu de la scène après un délai
        setTimeout(() => {
            console.log(scene.children);
        }, 3000);
    }
);
