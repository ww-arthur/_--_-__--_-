import type { RouteLocationNormalizedLoaded } from 'vue-router'
export default function () {
  return useState<RouteLocationNormalizedLoaded | null>('lastRoute', () => (null))
}