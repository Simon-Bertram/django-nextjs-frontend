"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setToken } from "@/app/lib/auth";

const DJANGO_API_LOGIN_URL = "http://localhost:8001/api/token/pair";

export async function POST(request) {
  const myAuthToken = (await cookies()).get("auth-token");
  console.log(myAuthToken.value);

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
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    console.log("Logged in");
    const authToken = responseData.access;
    setToken(authToken);
  }

  return NextResponse.json("Hello world", { status: 200 });
}
