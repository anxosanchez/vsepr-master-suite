import React from 'react';

// Exporting the same CPK standard colors to use in the legend
export const CPK_COLORS: Record<string, { color: string, name: string }> = {
    H: { color: "#FFFFFF", name: "Hidróxeno" },
    C: { color: "#909090", name: "Carbono" },
    N: { color: "#3050F8", name: "Nitróxeno" },
    O: { color: "#FF0D0D", name: "Osíxeno" },
    F: { color: "#90E050", name: "Flúor" },
    Cl: { color: "#1FF01F", name: "Cloro" },
    Br: { color: "#A62929", name: "Bromo" },
    S: { color: "#FFFF30", name: "Xofre" },
    P: { color: "#FF8000", name: "Fósforo" },
    B: { color: "#FFA5A5", name: "Boro" },
    Be: { color: "#C2FF00", name: "Berilio" },
    Xe: { color: "#429EB0", name: "Xénon" },
};

export const CPKLegend: React.FC = () => {
    // Only display a few representative ones to avoid clustering, or all.
    // Let's display those most common in our current VSEPR models
    const displayedElements = ['H', 'C', 'N', 'O', 'F', 'Cl', 'S', 'P', 'Xe', 'Br', 'B', 'Be'];

    return (
        <div className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg flex gap-3 text-xs pointer-events-none">
            <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Cores CPK</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    {displayedElements.map(symbol => (
                        <div key={symbol} className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                                style={{ backgroundColor: CPK_COLORS[symbol].color }}
                            />
                            <span className="text-slate-200 font-medium">
                                {symbol} <span className="text-slate-500 font-normal hidden sm:inline ml-1">- {CPK_COLORS[symbol].name}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
