import { cookies } from "next/headers";

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const REFRESH_TOKEN_NAME = "refresh-auth-token";

export async function getToken() {
  // api requests
  const myAuthToken = (await cookies()).get("auth-token");
  return myAuthToken?.value;
}

export async function setToken(authToken) {
  // login
  return (await cookies()).set({
    name: TOKEN_NAME,
    value: authToken,
    httpOnly: true, // limit client-side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

function deleteToken() {
  // logout
}

function getRefreshToken() {}
