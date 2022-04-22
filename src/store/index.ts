import { EpisodeDetailStore } from './episode-detail-store/EpisodeDetailStore';
import { CharactersListStore } from './character-store'
import { NavigationDataStore } from './NavigationDataStore'
import { LoaderDataStore } from './LoaderDataStore'
import { CharacterDetailStore } from './character-detail-store'

const loaderDataStore = new LoaderDataStore()
const navigationDataStore = new NavigationDataStore()
const charactersListStore = new CharactersListStore()
const characterDetailStore = new CharacterDetailStore()
const episodeDetailStore = new EpisodeDetailStore()

export * from './LoaderDataStore'
export * from './NavigationDataStore'
export * from './character-store'
export * from './character-detail-store'
export * from './episode-detail-store'

export {
  loaderDataStore,
  navigationDataStore,
  charactersListStore,
  characterDetailStore,
  episodeDetailStore
}

export default {
  loaderDataStore,
  navigationDataStore,
  charactersListStore,
  characterDetailStore,
  episodeDetailStore
}