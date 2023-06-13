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

export interface PokemonType {
    id: string;
    text: string;
}

export const types:PokemonType[] = [  
    { id:'electric', text: 'Électrik'},
    { id:'rock', text: 'Roche'},
    { id:'water', text: 'Eau'},
    { id:'fire', text: 'Feu'},
    { id:'ice', text: 'Glace'},
    { id:'fighting', text: 'Combat'},
    { id:'poison', text: 'Poison'},
    { id:'bug', text: 'Insect'},
    { id:'dark', text: 'Ténebres'},
    { id:'flying', text: 'Vol'},
    { id:'dragon', text: 'Dragon'},
    { id:'fairy', text: 'Fée'},
    { id:'steel', text: 'Acier'},
    { id:'psychic', text: 'Psy'},
    { id:'normal', text: 'Normal'},
    { id:'ghost', text: 'Spectrum'},
    { id:'grass', text: 'Plante'},  
    { id:'ground', text: 'Sol'}
  ];