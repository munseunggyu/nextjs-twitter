'use client';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import style from '@/app/(beforeLogin)/_component/signup.module.css';
import { signup } from '../_lib/signup';
import { useFormState, useFormStatus } from 'react-dom';

export default function SignupModal() {
  const [state, formAction] = useFormState(signup, { message: null });
  const { pending } = useFormStatus();
  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                  name="id"
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                  name="name"
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                  name="password"
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  name="image"
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button
                type="submit"
                className={style.actionButton}
                disabled={pending}
              >
                가입하기
              </button>
            </div>
            {state?.message && <p>{state.message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
