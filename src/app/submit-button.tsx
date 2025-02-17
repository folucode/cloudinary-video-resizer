'use client';

import { useFormStatus } from 'react-dom';
import styles from './page.module.css';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <button type='submit' className={styles['submit-button']}>
          Upload Video!
        </button>
      ) : (
        <button className={styles['submit-button']}>
          Uploading and Processing your video{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <circle cx={4} cy={12} r={3} fill='currentColor'>
              <animate
                id='svgSpinners3DotsBounce0'
                attributeName='cy'
                begin='0;svgSpinners3DotsBounce1.end+0.25s'
                calcMode='spline'
                dur='0.6s'
                keySplines='.33,.66,.66,1;.33,0,.66,.33'
                values='12;6;12'
              ></animate>
            </circle>
            <circle cx={12} cy={12} r={3} fill='currentColor'>
              <animate
                attributeName='cy'
                begin='svgSpinners3DotsBounce0.begin+0.1s'
                calcMode='spline'
                dur='0.6s'
                keySplines='.33,.66,.66,1;.33,0,.66,.33'
                values='12;6;12'
              ></animate>
            </circle>
            <circle cx={20} cy={12} r={3} fill='currentColor'>
              <animate
                id='svgSpinners3DotsBounce1'
                attributeName='cy'
                begin='svgSpinners3DotsBounce0.begin+0.2s'
                calcMode='spline'
                dur='0.6s'
                keySplines='.33,.66,.66,1;.33,0,.66,.33'
                values='12;6;12'
              ></animate>
            </circle>
          </svg>
        </button>
      )}
    </>
  );
}
