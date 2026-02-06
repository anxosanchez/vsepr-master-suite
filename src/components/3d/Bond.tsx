import * as THREE from "three";
import { useMemo } from "react";
import { BondData } from "../../types/vsepr";

interface BondProps {
    data: BondData;
}

export const Bond: React.FC<BondProps> = ({ data }) => {
    const { start, end } = data;

    const { position, rotation, height } = useMemo(() => {
        const startVec = new THREE.Vector3(...start);
        const endVec = new THREE.Vector3(...end);

        const distance = startVec.distanceTo(endVec);
        const position = startVec.clone().add(endVec).multiplyScalar(0.5);

        // Create a vector representing bond direction
        const direction = endVec.clone().sub(startVec).normalize();

        // Default cylinder generally orients along Y axis (0,1,0). 
        // We need to rotate it to match 'direction'.
        // We can use a group transformation or a known quaternion calc.
        // Cylinder is Y-up.
        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
        const rotation = new THREE.Euler().setFromQuaternion(quaternion);

        return {
            position,
            rotation,
            height: distance
        };
    }, [start, end]);

    return (
        // @ts-ignore - castShadow/receiveShadow are valid in R3F but TS is complaining
        <mesh position={position} rotation={rotation} castShadow={true} receiveShadow={true}>
            <cylinderGeometry args={[0.15, 0.15, height, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.3} roughness={0.4} />
        </mesh>
    );
};
