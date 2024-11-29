import styles from "./Search.module.css"

type Props = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search = (props: Props) => {
    return (
        <div className={styles.centerblockSearch}>
            <svg className={styles.searchSvg}>
                <use xlinkHref="image/icon/sprite.svg#icon-search"></use>
            </svg>
            <input
                value={props.value}
                onChange={props.onChange}
                className={styles.searchText}
                type="search"
                placeholder="Поиск"
                name="search"
            />
        </div>
    )
}
