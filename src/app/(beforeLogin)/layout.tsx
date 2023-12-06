import styles from '@/app/(beforeLogin)/_component/main.module.css';

type IProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function beforeLoginLayout({ children, modal }: IProps) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}
