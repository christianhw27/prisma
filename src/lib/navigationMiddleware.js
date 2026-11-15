import { isAdmin } from './authService'

/**
 * Route Permission Definitions:
 * - Public: Semua rute pembelajaran terbuka bebas untuk semua pengguna tanpa login
 * - Admin: Khusus CMS Admin yang dikelola oleh Administrator
 */
export const PUBLIC_ROUTES = [
  'beranda',
  'materi',
  'materi-detail',
  'learning-player',
  'settings'
]

export const ADMIN_ROUTES = ['admin']
export const PROTECTED_ROUTES = []

/**
 * Navigation Middleware Guard
 * Memeriksa izin akses sebelum berpindah rute/tab.
 * 
 * @param {string} targetRoute - Tab / rute yang ingin diakses
 * @returns {{ allowed: boolean, reason?: string, tab?: string }}
 */
export function canAccessRoute(targetRoute) {
  // 1. Admin Route Check
  if (ADMIN_ROUTES.includes(targetRoute)) {
    if (!isAdmin.value) {
      return {
        allowed: false,
        reason: 'Halaman CMS Admin memerlukan akses Administrator.',
        tab: 'admin'
      }
    }
    return { allowed: true }
  }

  // 2. Semua rute lainnya bersifat publik dan gratis
  return { allowed: true }
}
