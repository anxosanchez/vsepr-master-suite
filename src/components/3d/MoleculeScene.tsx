import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { VseprExample } from "../../types/vsepr";
import { MoleculeRenderer } from "./MoleculeRenderer";
import { Suspense } from "react";

interface MoleculeSceneProps {
    molecule: VseprExample;
    showLonePairs: boolean;
    autoRotate: boolean;
}

export const MoleculeScene: React.FC<MoleculeSceneProps> = ({ molecule, showLonePairs, autoRotate }) => {
    return (
        <div className="w-full h-full relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <Canvas
                camera={{ position: [0, 2, 8], fov: 45 }}
                shadows
                dpr={[1, 2]} // Support high DPI
            >
                <Suspense fallback={null}>
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-bias={-0.0001} />
                    {/* Rim/Backlight purplish for cinematic feel */}
                    <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8a2be2" />

                    <MoleculeRenderer
                        data={molecule}
                        showLonePairs={showLonePairs}
                        autoRotate={autoRotate}
                    />

                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" />
                    <OrbitControls
                        makeDefault
                        enablePan={false}
                        minDistance={4}
                        maxDistance={12}
                        minPolarAngle={Math.PI / 4} // ~45 degrees
                        maxPolarAngle={Math.PI - Math.PI / 4} // ~135 degrees
                    />
                </Suspense>
            </Canvas>

            {/* Overlay Instructions (Optional) */}
            <div className="absolute bottom-4 right-4 text-xs text-white/30 pointer-events-none">
                Click & Drag to Rotate • Scroll to Zoom
            </div>
        </div>
    );
};
