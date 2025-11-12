// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['pt', 'en', 'es']; // seus idiomas suportados

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verifica se o pathname já tem um locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redireciona para o locale padrão (pt)
  const defaultLocale = 'pt';
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|images|icons).*)',
  ],
};