import headerStyles from "../styles/header.module.scss";

const Header = (props) => {
  return <div className={headerStyles.header}>{props.children}</div>;
};

export default Header;
