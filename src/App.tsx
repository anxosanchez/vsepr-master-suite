import { useState } from 'react';
import { Sidebar } from './components/ui/Sidebar';
import { MoleculeScene } from './components/3d/MoleculeScene';
import { InfoPanel } from './components/ui/InfoPanel';
import { Controls } from './components/ui/Controls';
import { vseprData } from './data/molecules';
import { VseprExample } from './types/vsepr';

function App() {
    // Default to first example (Linear - BeCl2)
    const [currentMolecule, setCurrentMolecule] = useState<VseprExample>(vseprData[0].examples[0]);
    const [showLonePairs, setShowLonePairs] = useState(true);
    const [autoRotate, setAutoRotate] = useState(true);

    // Simple reset by forcing component remount with key if needed, or just state reset
    // For camera reset, we might need a ref to controls, but for now we just keep state simple.
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
        setResetKey(prev => prev + 1);
        setAutoRotate(true);
        setShowLonePairs(true);
    };

    return (
        <div className="flex w-full h-screen bg-slate-950 overflow-hidden font-sans text-slate-100 selection:bg-cyan-500/30">
            {/* Left Sidebar Navigation */}
            <Sidebar
                currentMolecule={currentMolecule}
                onSelect={setCurrentMolecule}
            />

            {/* Middle: 3D Scene */}
            <main className="flex-1 relative flex flex-col h-full overflow-hidden">
                <div className="flex-1">
                    <MoleculeScene
                        key={resetKey}
                        molecule={currentMolecule}
                        showLonePairs={showLonePairs}
                        autoRotate={autoRotate}
                    />
                </div>
            </main>

            {/* Right: Info Panel */}
            <aside className="p-4 flex flex-col justify-center border-l border-white/10 bg-slate-900/20">
                <InfoPanel data={currentMolecule} />
            </aside>

            {/* Floating Controls (Still absolute or positioned at bottom?) */}
            {/* Given the user asked to center the atom, making the InfoPanel a real panel on the right is the best way */}
            <Controls
                showLonePairs={showLonePairs}
                onToggleLonePairs={() => setShowLonePairs(!showLonePairs)}
                autoRotate={autoRotate}
                onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
                onReset={handleReset}
            />
        </div>
    );
}

export default App;
