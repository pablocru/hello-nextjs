// Source: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?database-method=sql&language=ts#nextjs-middleware

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession (request: NextRequest) {
  // Initialize the response variable with the original Next.js response.
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  // Create a Supabase server client with cookie handling.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get (name: string) {
          return request.cookies.get(name)?.value;
        },
        set (name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options
          });
          // Update the response to reflect changes in cookies.
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({
            name,
            value,
            ...options
          });
        },
        remove (name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options
          });
          // Update the response to reflect changes in cookies.
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({
            name,
            value: '',
            ...options
          });
        }
      }
    }
  );

  // refreshing the auth token
  await supabase.auth.getUser();

  return response;
}
