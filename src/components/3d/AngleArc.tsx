import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';
import { Vector3 } from '../../types/vsepr';

interface AngleArcProps {
    start: Vector3;
    end: Vector3;
    center?: Vector3;
    radius?: number;
    color?: string;
    label?: string; // Optional custom label, otherwise uses math
}

export const AngleArc: React.FC<AngleArcProps> = ({ 
    start, 
    end, 
    center = [0, 0, 0], 
    radius = 1.2, 
    color = "#38bdf8", // Sky blue
    label 
}) => {
    // Generate arc points using SLERP algorithm
    const { points, midPoint, angleDeg } = useMemo(() => {
        const c = new THREE.Vector3(...center);
        const s = new THREE.Vector3(...start).sub(c).normalize();
        const e = new THREE.Vector3(...end).sub(c).normalize();

        const angle = s.angleTo(e);
        const degrees = THREE.MathUtils.radToDeg(angle);

        // SLERP from start to end using Quaternions
        const numPoints = 20;
        const pts: [number, number, number][] = [];
        
        // Quaternion representing the total rotation from s to e
        const qTotal = new THREE.Quaternion().setFromUnitVectors(s, e);
        
        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const qIter = new THREE.Quaternion().slerp(qTotal, t);
            const v = s.clone().applyQuaternion(qIter).multiplyScalar(radius).add(c);
            pts.push([v.x, v.y, v.z]);
        }

        // Midpoint for the label
        const qMid = new THREE.Quaternion().slerp(qTotal, 0.5);
        const midV = s.clone().applyQuaternion(qMid).multiplyScalar(radius * 1.15).add(c);

        return { 
            points: pts, 
            midPoint: [midV.x, midV.y, midV.z] as [number, number, number],
            angleDeg: degrees 
        };
    }, [start, end, center, radius]);

    // Don't draw arcs for overlapping or completely opposing vectors (180deg can be drawn but sometimes unstable if vectors are purely parallel)
    // Actually SLERP is fine unless vectors are exactly opposite, where axis is ambiguous.
    // Three.js slerp handles 180 fine by picking an arbitrary axis. But for 180, arc is a semi-circle.
    
    // Format angle (e.g., 109.47 -> 109.5, 90.00 -> 90)
    const displayAngle = label || `${Math.abs(angleDeg - Math.round(angleDeg)) < 0.1 ? Math.round(angleDeg) : angleDeg.toFixed(1)}°`;

    return (
        <group>
            {/* The Arc line */}
            <Line
                points={points}
                color={color}
                lineWidth={2}
                dashed={true}
                dashSize={0.1}
                dashScale={0.1}
                transparent
                opacity={0.8}
            />
            {/* The Text Label */}
            {/* zIndexRange trick is useful to stop labels from disappearing behind canvas too eagerly */}
            <Html position={midPoint} center distanceFactor={12} zIndexRange={[100, 0]}>
                <div className="bg-slate-900/80 backdrop-blur border border-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded text-[10px] font-mono shadow-lg whitespace-nowrap select-none pointer-events-none">
                    {displayAngle}
                </div>
            </Html>
        </group>
    );
};
