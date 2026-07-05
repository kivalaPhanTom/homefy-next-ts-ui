import { USER_TOKEN, REFRESH_TOKEN, EXPIRED_TIME_TOKEN } from "@/common/ParamsCommon/ParamsCommon"
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { sessionToken, refreshToken, expired_time } = body;

  const response = NextResponse.json(body);

  response.cookies.set(USER_TOKEN, sessionToken, {
    path: "/",
    sameSite: "lax",
    maxAge: 31536000000,
  });

  response.cookies.set(REFRESH_TOKEN, refreshToken, {
    path: "/",
    sameSite: "lax",
    maxAge: 31536000000,
  });

  response.cookies.set(EXPIRED_TIME_TOKEN, expired_time, {
    path: "/",
    sameSite: "lax",
    maxAge: 31536000000,
  });

  return response;

  // const body = await request.json()
  // const { sessionToken, refreshToken, expired_time } = body
  // const newHeaders = new Headers(Response.headers);
  // newHeaders.set('set-cookie', `${USER_TOKEN}=${sessionToken}; Path=/; SameSite=Lax; Max-Age:31536000000`);
  // newHeaders.append('set-cookie', `${REFRESH_TOKEN}=${refreshToken}; Path=/; SameSite=Lax; Max-Age:31536000000`);
  // newHeaders.append('set-cookie', `${EXPIRED_TIME_TOKEN}=${expired_time}; Path=/; SameSite=Lax; Max-Age:31536000000`);
  // const response = Response.json(body, {
  //   status: 200,
  //   headers: newHeaders
  // })
  // return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(USER_TOKEN);
  response.cookies.delete(REFRESH_TOKEN);
  response.cookies.delete(EXPIRED_TIME_TOKEN);
  return response;
}