import * as THREE from "three";
import { Vector3 } from "../../types/vsepr";
import { useMemo } from "react";

interface GhostOrbitalProps {
    position: Vector3;
}

export const GhostOrbital: React.FC<GhostOrbitalProps> = ({ position }) => {
    const { pos, rot } = useMemo(() => {
        const p = new THREE.Vector3(...position);
        // Orient the lobe to point away from center (0,0,0) towards 'position'
        const direction = p.clone().normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
        const rot = new THREE.Euler().setFromQuaternion(quaternion);

        // Move slightly out so it looks attached to central atom
        // Central atom has radius ~0.8. We want lobe to start around there.
        // But 'position' is actually where the atom WOULD be.
        // Let's place the lobe mesh at 'position' / 2 approximately? 
        // Usually Lone Pair representation is a lobe closer to nucleus than a bonded atom.
        // The positions in our data are where atoms would be.
        // Let's scale or just place it at `position * 0.5`?
        // Actually, let's keep it at the defined position for consistency of "Domains", 
        // but maybe visualization-wise, lobes are often shown "sticking out".

        return { pos: p.multiplyScalar(0.6), rot };
    }, [position]);

    return (
        <group position={pos} rotation={rot}>
            {/* Lobe shape: A scaled sphere or capsule */}
            <mesh position={[0, 0.6, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshPhysicalMaterial
                    color="#f472b6" // Pinkish
                    transparent
                    opacity={0.4}
                    roughness={0.1}
                    transmission={0.5}
                    thickness={1}
                    emissive="#f472b6"
                    emissiveIntensity={0.5}
                />
            </mesh>
            {/* Two lobes for a single pair? usually VSEPR shows one big balloon. */}
            {/* Let's reshape it to be more tear-drop like by scaling Y */}
            <mesh position={[0, 0.4, 0]} scale={[0.8, 1.4, 0.8]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshPhysicalMaterial
                    color="#f472b6"
                    transparent
                    opacity={0.3}
                    emissive="#f472b6"
                    emissiveIntensity={0.2}
                    roughness={0.2}
                />
            </mesh>
            {/* Two small electrons dots inside */}
            <mesh position={[0.2, 0.8, 0]}>
                <sphereGeometry args={[0.08]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[-0.2, 0.8, 0]}>
                <sphereGeometry args={[0.08]} />
                <meshBasicMaterial color="white" />
            </mesh>
        </group>
    );
};
