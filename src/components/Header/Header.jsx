import style from './Header.module.scss'
import logo from './../../logo.svg'
import { Input, Select } from 'antd'



export default function Header({ setSearchTerm, setSelectedTags }) {

    return (
        <header className={style.header}>
            <img src={logo} alt='Pokedex' className={style.logo} />
            <Input.Search
                className={style.search}
                placeholder='Name'
                allowClear
                enterButton='Search'
                size='large'
                onSearch={(value) => setSearchTerm(value)}
            />
            <Select
                className={style.select}
                mode='multiple'
                size='large'
                optionLabelProp='label'
                allowClear={true}
                maxTagCount={2}
                onChange={(value) => setSelectedTags([...value])}
                placeholder='Select type'
            >
                {['normal', 'fire', 'water',
                    'grass', 'electric', 'ice',
                    'fighting', 'poison', 'ground',
                    'flying', 'psychic', 'bug',
                    'rock', 'ghost', 'dark',
                    'dragon', 'steel', 'fairy'].map(type =>
                        <Select.Option key={type} value={type}>{type[0].toUpperCase() + type.slice(1)}</Select.Option>
                    )}
            </Select>
        </header>
    )
}

