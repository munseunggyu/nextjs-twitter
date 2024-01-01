'use client';

import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useRef,
  useState
} from 'react';
import style from './postForm.module.css';
import { Session } from '@auth/core/types';
import TextAreaAutoSize from 'react-textarea-autosize';
import { constant } from '@/app/constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '@/model/Post';

type IProps = {
  me: Session | null;
};

export default function PostForm({ me }: IProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('content', content);
      preview.forEach(p => {
        p && formData.append('images', p.file);
      });
      return fetch(constant.apiUrl + '/api/posts', {
        method: 'post',
        credentials: 'include',
        body: formData
      });
    },
    async onSuccess(res) {
      setContent('');
      setPreview([]);
      const newPost = await res.json();
      if (queryClient.getQueryData(['posts', 'recommends'])) {
        queryClient.setQueryData(
          ['posts', 'recommends'],
          (prevData: { pages: Post[][] }) => {
            const shallow = { ...prevData, pages: [...prevData.pages] };
            shallow.pages[0] = [newPost, ...shallow.pages[0]];
            console.log('shallow', shallow);
            return shallow;
          }
        );
      }
    },
    onError(error) {
      console.log(error);
    }
  });

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    preview.forEach(p => {
      p && formData.append('images', p.file);
    });
    try {
      const res = await fetch(constant.apiUrl + '/api/posts', {
        method: 'post',
        credentials: 'include',
        body: formData
      });
      if (res.status === 201) {
        setContent('');
        setPreview([]);
        const newPost = await res.json();
        queryClient.setQueryData(
          ['posts', 'recommends'],
          (prevData: { pages: Post[][] }) => {
            const shallow = { ...prevData, pages: [...prevData.pages] };
            shallow.pages[0] = [newPost, ...shallow.pages[0]];
            console.log('shallow', shallow);
            return shallow;
          }
        );
      }
    } catch (error) {}
    console.log(formData);
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onRemove = (idx: number) => {
    setPreview(prev => prev.filter((v, index) => idx !== index));
  };

  const handlePreview: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    if (e.target.files) {
      Array.from(e.target.files).forEach((file, idx) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(prevPreview => {
            const prev = [...prevPreview];
            prev[idx] = {
              dataUrl: reader.result as string,
              file
            };
            return prev;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <form className={style.postForm} onSubmit={mutation.mutate}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          {me?.user && <img src={me.user.image as string} alt={me.user.id} />}
        </div>
      </div>
      <div className={style.postInputSection}>
        <TextAreaAutoSize
          value={content}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <div>
          {preview.map(
            (v, idx) =>
              v && (
                <div key={idx} onClick={() => onRemove(idx)}>
                  <img src={v.dataUrl} alt="미리보기" />
                </div>
              )
          )}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                onChange={handlePreview}
                ref={imageRef}
              />
              <button
                className={style.uploadButton}
                type="button"
                onClick={onClickButton}
              >
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
