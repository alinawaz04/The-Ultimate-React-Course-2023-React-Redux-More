import styles from "./AppFooter.module.css";

function AppFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
      </p>
    </footer>
  );
}

export default AppFooter;
