import * as THREE from "three";
import { Vector3 } from "../../types/vsepr";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { orbitalVertexShader, orbitalFragmentShader } from "./OrbitalShader";

interface GhostOrbitalProps {
    position: Vector3;
}

export const GhostOrbital: React.FC<GhostOrbitalProps> = ({ position }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { pos, rot } = useMemo(() => {
        const p = new THREE.Vector3(...position);
        const direction = p.clone().normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
        const rot = new THREE.Euler().setFromQuaternion(quaternion);

        return { pos: p.multiplyScalar(0.6), rot };
    }, [position]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#4a00e0") }, // Inner darker color
        uRimColor: { value: new THREE.Color("#00ffff") } // Cyan bright rim
    }), []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <group position={pos} rotation={rot}>
            {/* Single tear-drop electronic lobe using custom shader */}
            <mesh position={[0, 0.4, 0]} scale={[0.7, 1.6, 0.7]}>
                <sphereGeometry args={[0.5, 64, 64]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={orbitalVertexShader}
                    fragmentShader={orbitalFragmentShader}
                    uniforms={uniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            
            {/* Inner dense core to simulate electron pair center of mass probabilty */}
            <mesh position={[0, 0.6, 0]} scale={[0.4, 0.8, 0.4]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    emissive="#ffffff"
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
};
