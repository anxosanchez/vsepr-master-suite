import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { VseprExample } from "../../types/vsepr";
import { Atom } from "./Atom";
import { Bond } from "./Bond";
import { GhostOrbital } from "./GhostOrbital";
import { AngleArc } from "./AngleArc";

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

    const angleArcs = useMemo(() => {
        const drawnAngles = new Set<string>();
        const result: React.ReactNode[] = [];
        const isLinear = data.bonds.length <= 2; // For linear molecules we DO want to draw 180.

        for (let i = 0; i < data.bonds.length; i++) {
            for (let j = i + 1; j < data.bonds.length; j++) {
                const b1 = data.bonds[i];
                const b2 = data.bonds[j];
                
                const c = new THREE.Vector3(...b1.start); // Center
                const v1 = new THREE.Vector3(...b1.end).sub(c).normalize();
                const v2 = new THREE.Vector3(...b2.end).sub(c).normalize();
                
                const angleRad = v1.angleTo(v2);
                const angleDeg = THREE.MathUtils.radToDeg(angleRad);
                
                const bucketKey = angleDeg.toFixed(1);
                
                // Filter almost colinear or identical vectors to avoid bad UX
                if (angleDeg < 5) continue;
                // If it's a 180 degree angle but the molecule is larger than 2 bonds (e.g., Octahedral/TBP), 
                // drawing 180 arcs clutters the center and bisects the molecule awkwardly.
                if (!isLinear && Math.abs(angleDeg - 180) < 5) continue;

                if (!drawnAngles.has(bucketKey)) {
                    result.push(
                        <AngleArc 
                            key={`arc-${bucketKey}`} 
                            start={b1.end} 
                            end={b2.end} 
                            center={b1.start}
                            // In VSEPR we show slightly smaller true angles when lone pairs exist
                            // but instead of overriding it, calculating mathematically is a great "Simulator" feature.
                         />
                    );
                    drawnAngles.add(bucketKey);
                }
            }
        }
        return result;
    }, [data.bonds]);

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

            {/* Arcs (Draw 1 representative arc for each unique angle between bonds) */}
            {angleArcs}

            {/* Lone Pairs (Ghost Orbitals) */}
            {showLonePairs && data.lonePairPositions.map((pos, idx) => (
                <GhostOrbital key={`lp-${idx}`} position={pos} />
            ))}
        </group>
    );
};
