import { Info } from "lucide-react";
import { VseprExample } from "../../types/vsepr";

interface InfoPanelProps {
    data: VseprExample;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ data }) => {
    return (
        <div className="w-72 max-h-[80vh] overflow-y-auto bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{data.formula}</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30">
                    {data.notation}
                </span>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Nome da Xeometría</h3>
                    <p className="text-base font-medium text-cyan-200 leading-tight">{data.name}</p>
                </div>

                <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <h3 className="text-[10px] text-slate-400 mb-1">Xeom. Electrónica</h3>
                        <p className="text-sm font-semibold">{data.geometryElectron}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <h3 className="text-[10px] text-slate-400 mb-1">Ángulos de Enlace</h3>
                        <p className="text-sm font-semibold">{data.angles}</p>
                    </div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 text-xs text-left">Pares Enlazantes</span>
                        <span className="font-bold">{data.bondingPairs}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 text-xs text-left">Pares Solitarios</span>
                        <span className={data.lonePairs > 0 ? "font-bold text-pink-400" : "font-bold text-slate-500"}>
                            {data.lonePairs}
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2 text-left">
                        <Info size={12} /> Descrición
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5 text-left">
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    );
};
