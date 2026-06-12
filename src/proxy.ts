import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // api・_next・静的ファイルを除く全パスにマッチ
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
