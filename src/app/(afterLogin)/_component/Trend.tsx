import Link from 'next/link';
import style from './trend.module.css';
import { Hashtag } from '@/model/Hashtag';
type IProps = {
  trend: Hashtag;
};
export default function Trend({ trend }: IProps) {
  return (
    <Link href={`/search?q=트렌드`} className={style.container}>
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
