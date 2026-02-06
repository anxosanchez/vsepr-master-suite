export type Vector3 = [number, number, number];

export interface AtomData {
    symbol: string;
    position: Vector3;
    color: string;
    radius: number;
}

export interface BondData {
    start: Vector3;
    end: Vector3;
}

export interface LonePairData {
    position: Vector3;
    rotation: Vector3; // Euler angles or direction
}

export interface VseprExample {
    id: string;
    name: string;
    formula: string;
    stericNumber: number;
    bondingPairs: number;
    lonePairs: number;
    notation: string; // AXnEm
    geometryElectron: string;
    geometryMolecular: string;
    angles: string;
    description: string;
    atoms: AtomData[];
    bonds: BondData[];
    lonePairPositions: Vector3[]; // Just positions, rotation can be derived or fixed
}

export interface StericGroup {
    stericNumber: number;
    geometryName: string;
    examples: VseprExample[];
}
