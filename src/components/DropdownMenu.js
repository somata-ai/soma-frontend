import { IoMdArrowDropdown } from "react-icons/io";
import styles from "../styles/dropdownMenu.module.scss";

const DropdownMenu = (props) => {
  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.title}>
        {props.title} <IoMdArrowDropdown />
      </div>
      <div className={styles.dropdownMenuContent}>{props.children}</div>
    </div>
  );
};

export default DropdownMenu;
