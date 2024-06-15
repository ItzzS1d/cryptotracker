import styles from "./SelectButton.module.css";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={styles.selectbutton}
      style={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        marginBottom: 40,
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
