"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { Suspense } from "react";

import * as THREE from "three";
import { useMemo } from "react";

function BusinessCard() {
    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        const width = 3.5;
        const height = 2;
        const radius = 0.1;
        const x = -width / 2;
        const y = -height / 2;

        shape.moveTo(x + radius, y);
        shape.lineTo(x + width - radius, y);
        shape.quadraticCurveTo(x + width, y, x + width, y + radius);
        shape.lineTo(x + width, y + height - radius);
        shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        shape.lineTo(x + radius, y + height);
        shape.quadraticCurveTo(x, y + height, x, y + height - radius);
        shape.lineTo(x, y + radius);
        shape.quadraticCurveTo(x, y, x + radius, y);

        return shape;
    }, []);

    const extrudeSettings = useMemo(() => ({
        depth: 0.02,
        bevelEnabled: false,
    }), []);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[0, -0.2, 0]}>
                {/* Card Mesh */}
                <mesh castShadow receiveShadow position={[0, 0, -0.01]}>
                    <extrudeGeometry args={[shape, extrudeSettings]} />
                    <meshStandardMaterial
                        color="#111111"
                        roughness={0.8}
                        metalness={0.1}
                    />
                </mesh>

                {/* Front Text - Main Title */}
                <Text
                    position={[0, 0.3, 0.02]}
                    fontSize={0.35}
                    color="#ffffff"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    REDESIGN3D
                </Text>

                {/* Front Text - Subtitle */}
                <Text
                    position={[0, -0.3, 0.02]}
                    fontSize={0.15}
                    color="#aaaaaa"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    redesign3d.shop
                </Text>
            </group>
        </Float>
    );
}

export function Hero3DCard() {
    return (
        <div className="w-full h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <BusinessCard />

                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
