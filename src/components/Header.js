import styles from "../styles/header.module.css";

const Header = (props) => {
  return <div className={styles.header}>{props.children}</div>;
};

export default Header;
