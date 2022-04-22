export interface ICharacterData {
  id: string
  name: string
  species: string
  gender: string
  episode: [string]
  url: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  status: string
}

export interface ILocationData {
  id: string
  name: string
  type: string
  dimension: string
  residents: [string]
}

export interface IEpisodeDetail {
  name: string
  air_date: string
  episode: string
  characters: [string]
}