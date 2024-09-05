import styles from "./Filter.module.css"
import classNames from "classnames";

export const Filter = () => {
    return (
        <div className={styles.centerblockFilter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={classNames(styles.filterButton, styles.buttonAuthor, styles._btnText)}>исполнителю</div>
        <div className={classNames(styles.filterButton, styles.buttonYearh, styles._btnText)}>году выпуска</div>
        <div className={classNames(styles.filterButton, styles.buttonGenre, styles._btnText)}>жанру</div>
        </div>
    )
}
