import { useState } from 'react';
import { Sidebar } from './components/ui/Sidebar';
import { MoleculeScene } from './components/3d/MoleculeScene';
import { InfoPanel } from './components/ui/InfoPanel';
import { Controls } from './components/ui/Controls';
import { CPKLegend } from './components/ui/CPKLegend';
import { vseprData } from './data/molecules';
import { VseprExample } from './types/vsepr';
import { Menu, X, Info } from 'lucide-react';
import { clsx } from 'clsx';

function App() {
    const [currentMolecule, setCurrentMolecule] = useState<VseprExample>(vseprData[0].examples[0]);
    const [showLonePairs, setShowLonePairs] = useState(true);
    const [autoRotate, setAutoRotate] = useState(true);
    const [resetKey, setResetKey] = useState(0);

    // Mobile States
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const handleReset = () => {
        setResetKey(prev => prev + 1);
        setAutoRotate(true);
        setShowLonePairs(true);
    };

    return (
        <div className="relative w-full h-screen bg-slate-950 overflow-hidden font-sans text-slate-100 selection:bg-cyan-500/30">
            {/* 3D Scene - Fullscreen Background */}
            <div className="absolute inset-0 z-0">
                <MoleculeScene
                    key={resetKey}
                    molecule={currentMolecule}
                    showLonePairs={showLonePairs}
                    autoRotate={autoRotate}
                />
            </div>

            {/* Mobile Top Bar (Nav toggles) */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-40 md:hidden pointer-events-none">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg pointer-events-auto text-white hover:bg-slate-800"
                >
                    <Menu size={24} />
                </button>
                <button 
                    onClick={() => setIsInfoOpen(!isInfoOpen)}
                    className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg pointer-events-auto text-cyan-400 hover:bg-slate-800"
                >
                    <Info size={24} />
                </button>
            </div>

            {/* Sidebar (Left Drawer) */}
            <div className={clsx(
                "absolute top-0 left-0 h-full z-50 transition-transform duration-300 md:translate-x-0 md:z-20",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Mobile Close Button inside Sidebar wrapper to keep Sidebar clean */}
                <div className="relative h-full flex">
                    <Sidebar 
                        currentMolecule={currentMolecule} 
                        onSelect={(m) => {
                            setCurrentMolecule(m);
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }} 
                    />
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute top-4 -right-12 p-2 bg-slate-900 border border-white/10 rounded-r-lg text-white md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile overlay for sidebar */}
            {isSidebarOpen && (
                <div 
                    className="absolute inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Info Panel (Right Floating) */}
            <div className={clsx(
                "absolute top-20 md:top-4 right-4 z-40 md:z-20 transition-all duration-300 origin-top-right",
                "md:scale-100 md:opacity-100",
                isInfoOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none md:pointer-events-auto"
            )}>
                <InfoPanel data={currentMolecule} />
            </div>

            {/* Visual indicator for colors used in atoms (Hidden on very small screens) */}
            <div className="hidden sm:block">
                <CPKLegend />
            </div>

            {/* Floating Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                <Controls
                    showLonePairs={showLonePairs}
                    onToggleLonePairs={() => setShowLonePairs(!showLonePairs)}
                    autoRotate={autoRotate}
                    onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
                    onReset={handleReset}
                />
            </div>
        </div>
    );
}

export default App;
