import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  
  // /shop へのアクセスをサブドメインにリダイレクト
  if (url.pathname.startsWith('/shop')) {
    const shopPath = url.pathname.replace('/shop', '')
    return NextResponse.redirect(
      new URL(`https://shop.doseewellness.com${shopPath}${url.search}`)
    )
  }
}

export const config = {
  matcher: '/shop/:path*',
}
