"use client";

import { TrackType } from "@/TrackType";
import styles from "./Filter.module.css";
import classNames from "classnames";
import React, { useState } from "react";

type FilterProps = { tracks: TrackType[] };

export const Filter = ({ tracks }: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  //функция, которая помгает не дублировать значения(в данном случае автора)
  const getUniqueValues = <T, K extends keyof T>(
    items: T[],
    key: K
  ): string[] => {
    const uniqueValues = new Set<string>();
    items.forEach((item) => {
      uniqueValues.add(String(item[key]));
    });
    return Array.from(uniqueValues); //перебирает авторов, если он уже существует, то он не будет дублироваться в списке
  };

  const FilterOptions = ["по умолчанию", "сначала новые", "сначала старые"];

  const filters = [
    {
      title: `исполнителю`,
      key: `author`,
      list: getUniqueValues(tracks, "author"),
    },

    {
      title: `жанру`,
      key: `genre`,
      list: getUniqueValues(tracks, "genre"),
    },

    {
      title: `году`,
      key: `year`,
      list: FilterOptions,
    },
  ];

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <div key={filter.key}>
          <div
            className={classNames(
              styles.filterButton,
              styles.buttonYearh,
              styles._btnText
            )}
           
            onClick={() => handleFilter(filter.key)}>
            {filter.title}
          </div> 
          {activeFilter === filter.key && (<div className={styles.filterKey}><ul className={styles.ulFilter}>{(filter.list.map ((item) => <li key={item}>{item}</li>))}</ul></div> )}
        </div>
      ))}
      {/* <div className={classNames(styles.filterButton, styles.buttonAuthor, styles._btnText)} onClick={() => handleFilter('author')}>исполнителю</div>
        <div className={classNames(styles.filterButton, styles.buttonYearh, styles._btnText)}>году выпуска</div>
        <div className={classNames(styles.filterButton, styles.buttonGenre, styles._btnText)}>жанру</div> */}
    </div>
  );
};
