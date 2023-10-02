import Styles from "./navBar.styles.module.css";

export default function NavBar() {
  return (
    <div className={Styles.searchContainer}>
      <form className={Styles.form}>
        <input placeholder="    Search your pokemon" type="text" />
        <button className={Styles.btn}>Buscar</button>
      </form>
    </div>
  );
}
