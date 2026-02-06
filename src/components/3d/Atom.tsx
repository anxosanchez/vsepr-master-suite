import { Html } from "@react-three/drei";
import { AtomData } from "../../types/vsepr";

interface AtomProps {
    data: AtomData;
}

export const Atom: React.FC<AtomProps> = ({ data }) => {
    return (
        <group position={data.position}>
            {/* @ts-ignore */}
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[data.radius, 32, 32]} />
                <meshPhysicalMaterial
                    color={data.color}
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={0.8}
                    clearcoatRoughness={0.1}
                />
            </mesh>
            {/* Label (optional, maybe toggleable) */}
            <Html distanceFactor={10} zIndexRange={[100, 0]}>
                <div className="text-white font-bold text-xs pointer-events-none drop-shadow-md select-none bg-black/20 px-1 rounded">
                    {data.symbol}
                </div>
            </Html>
        </group>
    );
};
