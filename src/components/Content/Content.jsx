import { useState } from 'react'
import style from './Content.module.scss'
import { Card, Pagination } from 'antd'

export default function Content({ pokemons }) {

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [showInfo, setShowInfo] = useState(new Set())

    const onChangePagination = (pageNumber, pageSize) => {
        setCurrentPage(pageNumber)
        setPageSize(pageSize)
    }

    const showHideInfo = (pokemonId) => {
        if (showInfo.has(pokemonId))
            setShowInfo(previousState => new Set([...previousState].filter(x => x !== pokemonId)))
        else
            setShowInfo(previousState => new Set(previousState.add(pokemonId)))
    }

    return (
        <main className={style.container}>
            <Pagination
                responsive={false}
                defaultCurrent={1}
                total={pokemons.length}
                pageSizeOptions={[10, 20, 50]}
                onChange={onChangePagination}
            />
            <div className={style.content}>
                {pokemons
                    .filter((pokemon, index) =>
                        index < currentPage * pageSize
                        && index >= (currentPage - 1) * pageSize
                    )
                    .map((pokemon, index) =>
                        <Card
                            className={style.card}
                            key={index}
                            title={pokemon.name}
                            extra={
                                <div className={style.more_hide} onClick={() => showHideInfo(pokemon.id)}>
                                    {showInfo.has(pokemon.id) ? 'Hide' : 'Info'}
                                </div>
                            }
                        >
                            <div className={style.card__body}>
                                <div className={`${style.info} ${showInfo.has(pokemon.id) ? style.active : ''}`}>
                                    <div>Height: {(pokemon.height * 0.1).toFixed(1)} m</div>
                                    <div>Weight: {(pokemon.weight * 0.1).toFixed(1)} kg</div>
                                    <div>Abilities: {pokemon.abilities[0].ability.name}</div>
                                </div>
                                <div>№ {('000' + pokemon.id).slice(-3)}</div>
                                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                                <span className={style[pokemon.types[0].type.name]}>{pokemon.types[0].type.name}</span>
                                {pokemon.types[1]
                                    && <span className={style[pokemon.types[1].type.name]}>{pokemon.types[1].type.name}</span>}
                            </div>
                        </Card>
                    )}
            </div >
        </main >
    )
}