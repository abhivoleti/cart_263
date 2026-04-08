import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class PlanetB {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        // --- interaction state ---
        this.moonJumping = false;
        this.moonJumpTime = 0;

        this.group = new THREE.Group();

        // Planet
        const geometryPlanetB = new THREE.SphereGeometry(1.5, 64, 64);
        const materialPlanetB = new THREE.MeshStandardMaterial({
            color: 0x3d88b3,
            emissive: 0x852929,
            emissiveIntensity: .5,
            flatShading: false,
            metalness: .29,
            roughness: .7,
        });
        const planetB = new THREE.Mesh(geometryPlanetB, materialPlanetB);
        planetB.castShadow = true;
        planetB.receiveShadow = true;
        this.group.add(planetB);

        // Glow
        const glowGeometryB = new THREE.SphereGeometry(2, 20, 12);
        const glowMaterialB = new THREE.MeshBasicMaterial({
            color: 0x852929,
            transparent: true,
            opacity: 0.35,
        });
        this.planetBglow = new THREE.Mesh(glowGeometryB, glowMaterialB);
        this.planetBglow.castShadow = false;
        this.group.add(this.planetBglow);

        // Moons
        const moonNum = Math.floor(Math.random() * (3 - 1) + 1);
        this.moons = [];

        for (let i = 0; i < moonNum; i++) {
            const moonRotation = new THREE.Group();

            const geometryMoon = new THREE.SphereGeometry(Math.random() * (0.7 - 0.4) + 0.4, 32, 32);
            const materialMoon = new THREE.MeshStandardMaterial({
                color: 0x852929,
                emissive: 0x3d88b3,
                emissiveIntensity: .5,
                flatShading: false,
                metalness: .9,
                roughness: .7,
            });
            const moon = new THREE.Mesh(geometryMoon, materialMoon);
            moon.castShadow = true;
            moon.receiveShadow = true;

            const orbitRad = 3 + i * 1.5;
            moon.position.x = orbitRad;
            moonRotation.rotation.y = Math.random() * Math.PI * 2;
            moonRotation.add(moon);

            this.moons.push({
                group: moonRotation,
                speed: Math.random() * (1 - 0.5) + 0.5,
                mesh: moon,
                baseY: 0,
            });

            this.group.add(moonRotation);
        }

        // Trees
        const loader = new GLTFLoader();
        loader.load('/models/tree/scene.gltf', (gltf) => {
            const tree1 = gltf.scene;
            tree1.position.set(0, 1.4, 0);
            tree1.scale.set(5, 5, 5);
            planetB.add(tree1);

            const positions = [
                { pos: [0, 0, 1.4],   rot: [Math.PI/2, 0, 0] },
                { pos: [1.4, 0, 0],   rot: [0, 0, -Math.PI/2] },
                { pos: [0, -1.4, 0],  rot: [Math.PI, 0, 0] },
                { pos: [0, 0, -1.4],  rot: [-Math.PI/2, 0, 0] },
                { pos: [-1.4, 0, 0],  rot: [0, 0, Math.PI/2] },
            ];
            positions.forEach(({ pos, rot }) => {
                const t = tree1.clone();
                t.position.set(...pos);
                t.scale.set(5, 5, 5);
                t.rotation.set(...rot);
                planetB.add(t);
            });
        }, undefined, (error) => console.error('Error loading tree:', error));

        // Cat
        const catLoader = new GLTFLoader();
        catLoader.load('/models/cat/scene.gltf', (gltf) => {
            const cat1 = gltf.scene;
            cat1.position.set(0, 1, 1);
            cat1.scale.set(0.02, 0.02, 0.02);
            cat1.rotation.x = Math.PI / 3;
            planetB.add(cat1);
        }, undefined, (error) => console.error('Error loading cat:', error));

        // --- Click anywhere: randomize glow color ---
        this._onClick = () => {
            this.planetBglow.material.color.setHex(Math.random() * 0xffffff);
        };
        window.addEventListener('click', this._onClick);

        // --- Space bar: moon jump ---
        this._onKeyDown = (e) => {
            if (e.code === 'Space' && !this.moonJumping) {
                e.preventDefault();
                this.moonJumping = true;
                this.moonJumpTime = 0;
            }
        };
        window.addEventListener('keydown', this._onKeyDown);

        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.group.rotation.y += delta * 0.5;

        // Moon orbits
        this.moons.forEach(moon => {
            moon.group.rotation.y += delta * moon.speed;
        });

        // Moon jump — smooth sine arc over 0.6 seconds
        const JUMP_DURATION = 0.6;
        const JUMP_HEIGHT = 1.2;
        if (this.moonJumping) {
            this.moonJumpTime += delta;
            const t = this.moonJumpTime / JUMP_DURATION;
            if (t >= 1) {
                this.moonJumping = false;
                this.moons.forEach(moon => { moon.mesh.position.y = moon.baseY; });
            } else {
                const offset = Math.sin(Math.PI * t) * JUMP_HEIGHT;
                this.moons.forEach(moon => {
                    moon.mesh.position.y = moon.baseY + offset;
                });
            }
        }
    }

    click(mouse, scene, camera) {
        // Raycasting placeholder
    }

    dispose() {
        window.removeEventListener('click', this._onClick);
        window.removeEventListener('keydown', this._onKeyDown);
    }
}