export interface Part {
    id: number;
    description: string;
    title: string;
    src: string;
    type: string;
    cost: number;
    onSale?: boolean;
}

export interface Robot {
    head: Part;
    leftarm: Part;
    torso: Part;
    rightarm: Part;
    base: Part;
    cost?: number;
}

export interface Parts {
    heads: Part[];
    arms: Part[];
    torsos: Part[];
    bases: Part[];
}
