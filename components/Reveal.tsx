'use client'

import { useEffect } from 'react'

/**
 * スクロールで要素を下から出す仕掛け。
 *
 * ・`.reveal` を付けた要素を監視して、画面に入ったら `.is-visible` を付ける（CSS側で動かす）
 * ・一度出したら監視を外す（戻ってきたときに消えない）
 * ⚠️ JSが動かない環境では `.reveal` のまま＝不透明度0で見えなくなるので、
 *    <noscript> で打ち消すCSSを併せて出す。
 * ⚠️ IntersectionObserver が無い場合も同様に、その場で全部表示に切り替える。
 */
export default function Reveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((el) => {
      // 初期表示で既に画面内にあるものは、待たずに出す
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add('is-visible')
      } else {
        io.observe(el)
      }
    })
    return () => io.disconnect()
  }, [])

  return (
    <noscript>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: '.reveal{opacity:1 !important;transform:none !important}' }} />
    </noscript>
  )
}
