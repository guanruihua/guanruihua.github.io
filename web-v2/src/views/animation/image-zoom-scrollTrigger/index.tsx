import './index.scss'
import { usePageState } from './state'
import { Flex } from 'aurad'

export default function Image_zoom_scrollTrigger() {
  const { domRef, coverRef, bgRef } = usePageState()

  return (
    <div ref={domRef} className="animation__image_zoom_scrollTrigger">
      <div className="double-hero">
        <section className="hero">
          <div className="hero__content">
            <div ref={bgRef} className="hero__bg"></div>
          </div>
          <div ref={coverRef} className="hero__cover"></div>
        </section>
        <section className="hero-last"></section>
      </div>

      <section>
        <Flex
          alginCenter
          center
          column
          style={{
            height: '100%',
          }}
        >
          <div>
            If ever you are passing my way, don't wait to knock! Tea is at four;
          </div>
          <div>but any of you are welcome at any time.</div>
        </Flex>
      </section>
      <section className="last"></section>
    </div>
  )
}
