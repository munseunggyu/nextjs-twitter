import style from './post.module.css';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import PostArticle from './PostArticle';
import { faker } from '@faker-js/faker';
import PostImages from './PostImages';
import { Post } from '@/model/Post';
import { MouseEventHandler } from 'react';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type IProps = {
  post: Post;
};

export default function Post({ post }: IProps) {
  // const target = {
  //   postId: 1,
  //   User: {
  //     id: 'elonmusk',
  //     nickname: 'Elon Musk',
  //     image: '/yRsRRjGO.jpg'
  //   },
  //   content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
  //   createdAt: new Date(),
  //   Images: [] as any[]
  // };
  const target = post;
  if (Math.random() > 0.5) {
    target.Images.push({
      imageId: 1,
      link: faker.image.urlLoremFlickr()
    });
  }
  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = e => {
    e.stopPropagation();
  };
  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagation}
          >
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`} onClick={stopPropagation}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}>
            <PostImages post={target} />
          </div>
          <ActionButtons post={target} />
        </div>
      </div>
    </PostArticle>
  );
}
