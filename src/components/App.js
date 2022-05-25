import { useEffect, useState } from 'react'
import Header from './Header/Header'
import Content from './Content/Content'


export default function App() {

  const [pokemons, setPokemons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const getPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
    const data = await response.json()

    function createPokemonsObject(results) {
      results.forEach(async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await response.json()

        setPokemons(currentList => [...currentList, data])
      })
    }
    createPokemonsObject(data.results)
  }

  useEffect(() => {
    getPokemons()
  }, [])

  const filteredPokemons = pokemons
    .sort((a, b) => (a.id > b.id) ? 1 : -1)
    .filter(pokemon => {
      if (searchTerm === '')
        return pokemon
      else if (pokemon.name.includes(searchTerm.toLowerCase()))
        return pokemon
      return false
    })
    .filter(pokemon => {
      if (selectedTags.length === 0)
        return pokemon
      if (pokemon.types[1] && selectedTags.includes(pokemon.types[1].type.name)) {
        console.log(pokemon.types[1].type.name)
        return pokemon
      }
      else if (selectedTags.includes(pokemon.types[0].type.name)) {
        console.log(pokemon.types[0].type.name)
        return pokemon
      }
      return false
    })

  return (
    <>
      <Header setSearchTerm={setSearchTerm} setSelectedTags={setSelectedTags} />
      <Content pokemons={filteredPokemons} />
    </>
  )
}


