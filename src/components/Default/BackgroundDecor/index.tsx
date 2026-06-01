import Particles from '@/hook/BackgroundParticles'
import styles from './background.module.scss'

import Image from 'next/image'
import DocsLeft from './docs-left.webp'
import DocsRight from './docs-right.webp'

export default function BackgroundDecor() {
  const imageClasses = "p-relative z-minus p-events-none u-select-none";

  return (
    <div className={`w-full h-full p-fixed p-events-none u-select-none ${styles.background}`}>
        <Particles className={`w-full h-full p-events-none u-select-none ${styles.canvas}`} />
        <div className={`p-fixed  ${styles.left}`} >
          <Image
            src={DocsLeft}
            alt=""
            className={imageClasses}
            draggable={false}
            priority
          />
        </div>
        <div className={`p-fixed ${styles.right}`} >
          <Image
            src={DocsRight}
            alt=""
            className={imageClasses}
            draggable={false}
            priority
          />
        </div>
    </div>
  )
}