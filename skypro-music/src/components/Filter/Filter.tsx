import styles from "./Filter.module.css"

export const Filter = () => {
    return (
        <div className={styles.centerblockFilter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={styles.filterTitle}>исполнителю</div>
        <div className={styles.filterTitle}>году выпуска</div>
        <div className={styles.filterTitle}>жанру</div>
        </div>
    )
}

//возможно, тут будут вопросы по верстке в будущем (у исполнителя, года выпуска и жанра)