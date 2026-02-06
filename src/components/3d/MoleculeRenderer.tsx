import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { VseprExample } from "../../types/vsepr";
import { Atom } from "./Atom";
import { Bond } from "./Bond";
import { GhostOrbital } from "./GhostOrbital";

interface MoleculeRendererProps {
    data: VseprExample;
    showLonePairs: boolean;
    autoRotate: boolean;
}

export const MoleculeRenderer: React.FC<MoleculeRendererProps> = ({ data, showLonePairs, autoRotate }) => {
    const groupRef = useRef<any>(null);

    useFrame((_, delta) => {
        if (autoRotate && groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Atoms */}
            {data.atoms.map((atom, idx) => (
                <Atom key={`atom-${idx}`} data={atom} />
            ))}

            {/* Bonds */}
            {data.bonds.map((bond, idx) => (
                <Bond key={`bond-${idx}`} data={bond} />
            ))}

            {/* Lone Pairs (Ghost Orbitals) */}
            {showLonePairs && data.lonePairPositions.map((pos, idx) => (
                <GhostOrbital key={`lp-${idx}`} position={pos} />
            ))}
        </group>
    );
};
