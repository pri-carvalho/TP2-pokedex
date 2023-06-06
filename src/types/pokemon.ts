export interface PokemonListAPI{
    count?: number;
    next?: string;
    previous?: string;
    results: PokemonListResultat[]
}

export interface PokemonListResultat{
    name: string;
    url: string
}

export interface PokemonApi{
    id: number;
    name: string;
    imageUrl: string
}