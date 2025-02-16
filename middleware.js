import { NextResponse } from 'next/server';
import {jwtVerify} from 'jose';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isAccountPath = path === '/login' || path === '/register';

  const token = isTokenValid(request)
    .then(isValid => {
      return isValid;
    })
    .catch(error => {
      return false;
  });

  const retVal = token.then(isValid => {
    if(isAccountPath && isValid) return NextResponse.redirect(new URL('/', request.url), { status: 303 });
    if (!isAccountPath && !isValid && path !== '/') return NextResponse.redirect(new URL('/login', request.url), { status: 303 });
  });

  return retVal;
}

async function isTokenValid(request) {
    try {
        const token = request.cookies.get("token")?.value || ''; // Get the token cookie, if it exists.
        return await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET))
            .then(() => { return true; })
            .catch(error => { /*console.error('Error during token verification:', error);*/ return false; });
    } catch (error) {
        throw error;
    }
}


export const config = {
  matcher: [
    '/',
  ]
};