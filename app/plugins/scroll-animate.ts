type SAValue =
  | string
  | { animation?: string; delay?: number; threshold?: number }
  | undefined

interface SAElement extends HTMLElement {
  _saObserver?: IntersectionObserver
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<SAElement, SAValue>('scroll-animate', {
    mounted(el, binding) {
      const value = binding.value
      const animation = typeof value === 'string' ? value : (value?.animation ?? 'fade-up')
      const delay     = typeof value === 'object' && value?.delay     ? value.delay     : 0
      const threshold = typeof value === 'object' && value?.threshold ? value.threshold : 0.12

      el.classList.add('sa', `sa--${animation}`)
      if (delay) el.style.transitionDelay = `${delay}ms`

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('sa--visible')
            observer.unobserve(el)
          }
        },
        { threshold }
      )

      observer.observe(el)
      el._saObserver = observer
    },

    unmounted(el) {
      el._saObserver?.disconnect()
    },
  })
})
