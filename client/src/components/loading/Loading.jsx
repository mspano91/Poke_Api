import React from "react";
import styles from "../loading/loading.styles.module.css";

export default function Loading() {
  return (
    <div className={styles.loader}>
      <img
        className={styles.img}
        src="https://i.gifer.com/origin/06/068c8f36ce4e0216bcc86ccc2e2401a0_w200.gif"
        alt=""
      />
      <br />
      Loading...
    </div>
  );
}
