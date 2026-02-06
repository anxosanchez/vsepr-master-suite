import { VseprExample, StericGroup } from "../types/vsepr";

// Colors
const COLOR_CENTRAL = "#Eab308"; // Yellow-500
const COLOR_ATOM = "#94a3b8"; // Slate-400


// Helper to create basic atom
const createAtom = (symbol: string, pos: [number, number, number], central = false) => ({
    symbol,
    position: pos as [number, number, number],
    color: central ? COLOR_CENTRAL : COLOR_ATOM,
    radius: central ? 0.8 : 0.5,
});

// Helper for bonds
const createBonds = (centralPos: [number, number, number], surroundingPositions: [number, number, number][]) => {
    return surroundingPositions.map(pos => ({
        start: centralPos, // usually [0,0,0]
        end: pos
    }));
};

/*
  COORDINATE SYSTEMS:
  Central atom is always at [0,0,0]
*/

// --- STERIC NUMBER 2 ---
const steric2: VseprExample[] = [
    {
        id: "ax2",
        name: "Lineal",
        formula: "BeCl2",
        stericNumber: 2,
        bondingPairs: 2,
        lonePairs: 0,
        notation: "AX2",
        geometryElectron: "Lineal",
        geometryMolecular: "Lineal",
        angles: "180°",
        description: "Dous pares enlazantes maximizan a separación movéndose a lados opostos.",
        atoms: [
            createAtom("Be", [0, 0, 0], true),
            createAtom("Cl", [2.5, 0, 0]),
            createAtom("Cl", [-2.5, 0, 0]),
        ],
        bonds: createBonds([0, 0, 0], [[2.5, 0, 0], [-2.5, 0, 0]]),
        lonePairPositions: []
    }
];

// --- STERIC NUMBER 3 ---
const steric3: VseprExample[] = [
    {
        id: "ax3",
        name: "Trigonal Plana",
        formula: "BF3",
        stericNumber: 3,
        bondingPairs: 3,
        lonePairs: 0,
        notation: "AX3",
        geometryElectron: "Trigonal Plana",
        geometryMolecular: "Trigonal Plana",
        angles: "120°",
        description: "Tres pares dispostos nun triángulo plano.",
        atoms: [
            createAtom("B", [0, 0, 0], true),
            createAtom("F", [0, 2.5, 0]),
            createAtom("F", [2.165, -1.25, 0]),
            createAtom("F", [-2.165, -1.25, 0]),
        ],
        bonds: createBonds([0, 0, 0], [[0, 2.5, 0], [2.165, -1.25, 0], [-2.165, -1.25, 0]]),
        lonePairPositions: []
    },
    {
        id: "ax2e1",
        name: "Angular",
        formula: "SO2",
        stericNumber: 3,
        bondingPairs: 2,
        lonePairs: 1,
        notation: "AX2E1",
        geometryElectron: "Trigonal Plana",
        geometryMolecular: "Angular",
        angles: "<120°",
        description: "Un par solitario empurra os pares enlazantes máis preto un do outro.",
        atoms: [
            createAtom("S", [0, 0, 0], true),
            createAtom("O", [2.165, -1.25, 0]),
            createAtom("O", [-2.165, -1.25, 0]),
        ],
        bonds: createBonds([0, 0, 0], [[2.165, -1.25, 0], [-2.165, -1.25, 0]]),
        lonePairPositions: [[0, 2.5, 0]]
    }
];

// --- STERIC NUMBER 4 ---
const tetOffset = 2.5 / Math.sqrt(3); // distance for coords to be roughly 2.5 length
const tetraCoords = [
    [tetOffset, tetOffset, tetOffset] as [number, number, number],
    [-tetOffset, -tetOffset, tetOffset] as [number, number, number],
    [-tetOffset, tetOffset, -tetOffset] as [number, number, number],
    [tetOffset, -tetOffset, -tetOffset] as [number, number, number],
];

const steric4: VseprExample[] = [
    {
        id: "ax4",
        name: "Tetraédrica",
        formula: "CH4",
        stericNumber: 4,
        bondingPairs: 4,
        lonePairs: 0,
        notation: "AX4",
        geometryElectron: "Tetraédrica",
        geometryMolecular: "Tetraédrica",
        angles: "109.5°",
        description: "Catro enlaces apuntando aos vértices dun tetraedro.",
        atoms: [
            createAtom("C", [0, 0, 0], true),
            createAtom("H", tetraCoords[0]),
            createAtom("H", tetraCoords[1]),
            createAtom("H", tetraCoords[2]),
            createAtom("H", tetraCoords[3]),
        ],
        bonds: createBonds([0, 0, 0], tetraCoords),
        lonePairPositions: []
    },
    {
        id: "ax3e1",
        name: "Pirámide Trigonal",
        formula: "NH3",
        stericNumber: 4,
        bondingPairs: 3,
        lonePairs: 1,
        notation: "AX3E1",
        geometryElectron: "Tetraédrica",
        geometryMolecular: "Pirámide Trigonal",
        angles: "107°",
        description: "O par solitario comprime o ángulo de 109.5° a 107°.",
        atoms: [
            createAtom("N", [0, 0, 0], true),
            createAtom("H", tetraCoords[1]),
            createAtom("H", tetraCoords[2]),
            createAtom("H", tetraCoords[3]),
        ],
        bonds: createBonds([0, 0, 0], [tetraCoords[1], tetraCoords[2], tetraCoords[3]]),
        lonePairPositions: [tetraCoords[0]]
    },
    {
        id: "ax2e2",
        name: "Angular",
        formula: "H2O",
        stericNumber: 4,
        bondingPairs: 2,
        lonePairs: 2,
        notation: "AX2E2",
        geometryElectron: "Tetraédrica",
        geometryMolecular: "Angular",
        angles: "104.5°",
        description: "Dous pares solitarios comprimen o ángulo aínda máis a 104.5°.",
        atoms: [
            createAtom("O", [0, 0, 0], true),
            createAtom("H", tetraCoords[1]),
            createAtom("H", tetraCoords[2]),
        ],
        bonds: createBonds([0, 0, 0], [tetraCoords[1], tetraCoords[2]]),
        lonePairPositions: [tetraCoords[0], tetraCoords[3]]
    }
];

// --- STERIC NUMBER 5 ---
// Axial: Y axis. Equatorial: XZ plane 120 deg
const tbpAxialTop = [0, 3, 0] as [number, number, number];
const tbpAxialBottom = [0, -3, 0] as [number, number, number];
const tbpEq1 = [2.8, 0, 0] as [number, number, number];
const tbpEq2 = [-1.4, 0, 2.42] as [number, number, number];
const tbpEq3 = [-1.4, 0, -2.42] as [number, number, number];

const steric5: VseprExample[] = [
    {
        id: "ax5",
        name: "Bipirámide Trigonal",
        formula: "PCl5",
        stericNumber: 5,
        bondingPairs: 5,
        lonePairs: 0,
        notation: "AX5",
        geometryElectron: "Bipirámide Trigonal",
        geometryMolecular: "Bipirámide Trigonal",
        angles: "90°, 120°",
        description: "3 enlaces ecuatoriais (120°) e 2 enlaces axiais (90°).",
        atoms: [
            createAtom("P", [0, 0, 0], true),
            createAtom("Cl", tbpAxialTop),
            createAtom("Cl", tbpAxialBottom),
            createAtom("Cl", tbpEq1),
            createAtom("Cl", tbpEq2),
            createAtom("Cl", tbpEq3),
        ],
        bonds: createBonds([0, 0, 0], [tbpAxialTop, tbpAxialBottom, tbpEq1, tbpEq2, tbpEq3]),
        lonePairPositions: []
    },
    {
        id: "ax4e1",
        name: "Balancín",
        formula: "SF4",
        stericNumber: 5,
        bondingPairs: 4,
        lonePairs: 1,
        notation: "AX4E1",
        geometryElectron: "Bipirámide Trigonal",
        geometryMolecular: "Balancín",
        angles: "<90°, <120°",
        description: "O par solitario ocupa unha posición ecuatorial para ter máis espazo (Balancín).",
        atoms: [
            createAtom("S", [0, 0, 0], true),
            createAtom("F", tbpAxialTop),
            createAtom("F", tbpAxialBottom),
            createAtom("F", tbpEq2),
            createAtom("F", tbpEq3),
        ],
        bonds: createBonds([0, 0, 0], [tbpAxialTop, tbpAxialBottom, tbpEq2, tbpEq3]),
        lonePairPositions: [tbpEq1]
    },
    {
        id: "ax3e2",
        name: "Forma de T",
        formula: "ClF3",
        stericNumber: 5,
        bondingPairs: 3,
        lonePairs: 2,
        notation: "AX3E2",
        geometryElectron: "Bipirámide Trigonal",
        geometryMolecular: "Forma de T",
        angles: "<90°",
        description: "Dous pares solitarios en posicións ecuatoriais crean unha forma de T.",
        atoms: [
            createAtom("Cl", [0, 0, 0], true),
            createAtom("F", tbpAxialTop),
            createAtom("F", tbpAxialBottom),
            createAtom("F", tbpEq2), // One equatorial
        ],
        bonds: createBonds([0, 0, 0], [tbpAxialTop, tbpAxialBottom, tbpEq2]),
        lonePairPositions: [tbpEq1, tbpEq3]
    },
    {
        id: "ax2e3",
        name: "Lineal",
        formula: "XeF2",
        stericNumber: 5,
        bondingPairs: 2,
        lonePairs: 3,
        notation: "AX2E3",
        geometryElectron: "Bipirámide Trigonal",
        geometryMolecular: "Lineal",
        angles: "180°",
        description: "As tres posicións ecuatoriais están ocupadas por pares solitarios.",
        atoms: [
            createAtom("Xe", [0, 0, 0], true),
            createAtom("F", tbpAxialTop),
            createAtom("F", tbpAxialBottom),
        ],
        bonds: createBonds([0, 0, 0], [tbpAxialTop, tbpAxialBottom]),
        lonePairPositions: [tbpEq1, tbpEq2, tbpEq3]
    }
];

// --- STERIC NUMBER 6 ---
const octTop = [0, 3, 0] as [number, number, number];
const octBottom = [0, -3, 0] as [number, number, number];
const octFront = [0, 0, 3] as [number, number, number];
const octBack = [0, 0, -3] as [number, number, number];
const octLeft = [-3, 0, 0] as [number, number, number];
const octRight = [3, 0, 0] as [number, number, number];

const steric6: VseprExample[] = [
    {
        id: "ax6",
        name: "Octaédrica",
        formula: "SF6",
        stericNumber: 6,
        bondingPairs: 6,
        lonePairs: 0,
        notation: "AX6",
        geometryElectron: "Octaédrica",
        geometryMolecular: "Octaédrica",
        angles: "90°",
        description: "Seis enlaces equivalentes a ángulos de 90°.",
        atoms: [
            createAtom("S", [0, 0, 0], true),
            createAtom("F", octTop),
            createAtom("F", octBottom),
            createAtom("F", octFront),
            createAtom("F", octBack),
            createAtom("F", octLeft),
            createAtom("F", octRight),
        ],
        bonds: createBonds([0, 0, 0], [octTop, octBottom, octFront, octBack, octLeft, octRight]),
        lonePairPositions: []
    },
    {
        id: "ax5e1",
        name: "Pirámide Cuadrada",
        formula: "BrF5",
        stericNumber: 6,
        bondingPairs: 5,
        lonePairs: 1,
        notation: "AX5E1",
        geometryElectron: "Octaédrica",
        geometryMolecular: "Pirámide Cuadrada",
        angles: "<90°",
        description: "Un par solitario crea unha pirámide cadrada.",
        atoms: [
            createAtom("Br", [0, 0, 0], true),
            createAtom("F", octTop), // Axial
            createAtom("F", octFront),
            createAtom("F", octBack),
            createAtom("F", octLeft),
            createAtom("F", octRight),
        ],
        bonds: createBonds([0, 0, 0], [octTop, octFront, octBack, octLeft, octRight]),
        lonePairPositions: [octBottom]
    },
    {
        id: "ax4e2",
        name: "Cuadrada Plana",
        formula: "XeF4",
        stericNumber: 6,
        bondingPairs: 4,
        lonePairs: 2,
        notation: "AX4E2",
        geometryElectron: "Octaédrica",
        geometryMolecular: "Cuadrada Plana",
        angles: "90°",
        description: "Os pares solitarios ocupan posicións opostas para minimizar a repulsión.",
        atoms: [
            createAtom("Xe", [0, 0, 0], true),
            createAtom("F", octFront),
            createAtom("F", octBack),
            createAtom("F", octLeft),
            createAtom("F", octRight),
        ],
        bonds: createBonds([0, 0, 0], [octFront, octBack, octLeft, octRight]),
        lonePairPositions: [octTop, octBottom]
    }
];

export const vseprData: StericGroup[] = [
    { stericNumber: 2, geometryName: "Lineal (2 Pares)", examples: steric2 },
    { stericNumber: 3, geometryName: "Trigonal Plana (3 Pares)", examples: steric3 },
    { stericNumber: 4, geometryName: "Tetraédrica (4 Pares)", examples: steric4 },
    { stericNumber: 5, geometryName: "Bipirámide Trigonal (5 Pares)", examples: steric5 },
    { stericNumber: 6, geometryName: "Octaédrica (6 Pares)", examples: steric6 },
];
