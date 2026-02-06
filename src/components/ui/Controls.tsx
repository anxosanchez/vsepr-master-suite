import { Eye, EyeOff, RotateCw, RefreshCcw } from "lucide-react";
import { clsx } from "clsx";

interface ControlsProps {
    showLonePairs: boolean;
    onToggleLonePairs: () => void;
    autoRotate: boolean;
    onToggleAutoRotate: () => void;
    onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
    showLonePairs,
    onToggleLonePairs,
    autoRotate,
    onToggleAutoRotate,
    onReset
}) => {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-800/80 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-xl z-10">

            <button
                onClick={onToggleLonePairs}
                className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    showLonePairs ? "bg-pink-500/20 text-pink-300 hover:bg-pink-500/30" : "hover:bg-white/10 text-slate-400"
                )}
                title="Mostrar/Ocultar Pares Solitarios"
            >
                {showLonePairs ? <Eye size={18} /> : <EyeOff size={18} />}
                <span>Pares Solitarios</span>
            </button>

            <div className="w-px h-6 bg-white/10"></div>

            <button
                onClick={onToggleAutoRotate}
                className={clsx(
                    "p-2 rounded-full transition-all",
                    autoRotate ? "bg-cyan-500/20 text-cyan-300" : "hover:bg-white/10 text-slate-400"
                )}
                title="Rotación Automática"
            >
                <RotateCw size={18} />
            </button>

            <button
                onClick={onReset}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 transition-all"
                title="Reiniciar Vista"
            >
                <RefreshCcw size={18} />
            </button>

        </div>
    );
};
