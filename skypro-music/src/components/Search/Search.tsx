import styles from "./Search.module.css";

export const Search = () => {
    return (
        <div className={styles.centerblockSearch}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="image/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
    )
}