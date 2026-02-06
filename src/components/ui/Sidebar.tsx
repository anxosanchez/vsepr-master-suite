import { ChevronDown, ChevronRight, Activity } from "lucide-react";
import { useState } from "react";
import { vseprData } from "../../data/molecules";
import { VseprExample } from "../../types/vsepr";
import { clsx } from "clsx";

interface SidebarProps {
    currentMolecule: VseprExample;
    onSelect: (m: VseprExample) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentMolecule, onSelect }) => {
    const [openGroups, setOpenGroups] = useState<number[]>([2, 3, 4, 5, 6]);

    const toggleGroup = (num: number) => {
        setOpenGroups(prev =>
            prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
        );
    };

    return (
        <div className="w-80 h-full bg-slate-900 border-r border-white/10 flex flex-col p-4 overflow-y-auto">
            <div className="flex items-center gap-3 mb-8 px-2">
                <Activity className="text-cyan-400 w-8 h-8" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    VSEPR Master
                </h1>
            </div>

            <div className="space-y-4">
                {vseprData.map((group) => {
                    const isOpen = openGroups.includes(group.stericNumber);
                    return (
                        <div key={group.stericNumber} className="border-b border-white/5 pb-2">
                            <button
                                onClick={() => toggleGroup(group.stericNumber)}
                                className="w-full flex items-center justify-between text-slate-300 hover:text-white mb-2 py-2"
                            >
                                <span className="font-medium text-sm text-left">{group.geometryName}</span>
                                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>

                            {isOpen && (
                                <div className="flex flex-col gap-2 pl-2">
                                    {group.examples.map(ex => (
                                        <button
                                            key={ex.id}
                                            onClick={() => onSelect(ex)}
                                            className={clsx(
                                                "text-left px-3 py-2 rounded-lg text-sm transition-all border border-transparent",
                                                currentMolecule.id === ex.id
                                                    ? "bg-cyan-900/40 border-cyan-500/50 text-cyan-200"
                                                    : "hover:bg-white/5 text-slate-400 hover:text-white"
                                            )}
                                        >
                                            <div className="font-bold">{ex.formula} - {ex.geometryMolecular}</div>
                                            <div className="text-xs opacity-70">{ex.notation}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="mt-auto pt-8 text-xs text-slate-600 px-2 flex flex-col items-center gap-2">
                <span>VSEPR Master Suite v1.0</span>
                <div className="flex items-center gap-1.5 text-slate-500 font-medium opacity-80 hover:opacity-100 transition-opacity">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 496 512" 
                        className="w-3.5 h-3.5 fill-current"
                    >
                        <path d="M245.8 224.8c-20.5 0-36.9 13.9-36.9 31.2s16.4 31.2 36.9 31.2c16.1 0 29.8-8.8 34.6-21h36.7c-5.7 30.7-33.1 53.6-65.7 53.6-38 0-68.9-29.5-68.9-65.9 0-36.4 30.9-65.9 68.9-65.9 31.1 0 57.3 19.3 64.5 45.4h-36.6c-4.9-10.6-17.3-18.6-32.5-18.6zm132.1 0c-20.5 0-36.9 13.9-36.9 31.2s16.4 31.2 36.9 31.2c16.1 0 29.8-8.8 34.6-21h36.7c-5.7 30.7-33.1 53.6-65.7 53.6-38 0-68.9-29.5-68.9-65.9 0-36.4 30.9-65.9 68.9-65.9 31.1 0 57.3 19.3 64.5 45.4h-36.6c-4.9-10.6-17.3-18.6-32.5-18.6zM248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200z"/>
                    </svg>
                    <span>Anxo Sánchez 2026</span>
                </div>
            </div>
        </div>
    );
};
