import styles from '../../styles/header.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div>
        <img src="/Logo.svg" alt="Logo" />
      </div>
    </header>
  )
} 