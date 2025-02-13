import { useState, useEffect } from "react";
import styles from "./footer.module.css";

export default function Footer({
  todos,
  setTodos,
  totalTodos,
  completedTodos,
}) {
  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem("sortBy") || ""
  );

  useEffect(() => {
    if (sortBy) {
      sortTodos(sortBy);
    }
  }, [sortBy]);

  const handleSort = (type) => {
    const newSort = sortBy === type ? "" : type;
    setSortBy(newSort);
    localStorage.setItem("sortBy", newSort);
    sortTodos(newSort);
  };

  const sortTodos = (type) => {
    let sortedTodos = [...todos];

    if (type === "date") {
      sortedTodos.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (type === "completed") {
      sortedTodos.sort((a, b) => Number(a.done) - Number(b.done));
    } else if (type === "name") {
      sortedTodos.sort((a, b) => a.name.localeCompare(b.name));
    }

    setTodos(sortedTodos);
  };

  return (
    <>
      <div className={styles.sortButtons}>
        <button
          onClick={() => handleSort("date")}
          className={styles.modernButtons}
          style={{ backgroundColor: sortBy === "date" ? "lightblue" : "white" }}
        >
          {sortBy === "date" ? "Unsort by Date" : "Sort by Date"}
        </button>

        <button
          onClick={() => handleSort("completed")}
          className={styles.modernButtons}
          style={{
            backgroundColor: sortBy === "completed" ? "lightblue" : "white",
          }}
        >
          {sortBy === "completed" ? "Unsort by Completed" : "Sort by Completed"}
        </button>

        <button
          onClick={() => handleSort("name")}
          className={styles.modernButtons}
          style={{ backgroundColor: sortBy === "name" ? "lightblue" : "white" }}
        >
          {sortBy === "name" ? "Unsort by Name" : "Sort by Name"}
        </button>
      </div>
      <div className={styles.footer}>
        <span className={styles.item}>Total To-Do : {totalTodos}</span>
        <span className={styles.item}>Completed : {completedTodos}</span>
      </div>
    </>
  );
}
