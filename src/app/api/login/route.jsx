"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://localhost:8001/api/token/pair";

export async function POST(request) {
  const requestData = await request.json();
  const jsonData = JSON.stringify(requestData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };
  const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    console.log("Logged in");
  }

  const authToken = cookies().get("auth-token");

  cookies().set({
    name: "auth-token",
    value: "abc",
    httpOnly: true, // limit client-side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3600,
  });
  return NextResponse.json("Hello world", { status: 200 });
}
