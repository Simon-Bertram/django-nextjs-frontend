"use server";
import { NextResponse } from "next/server";
import { setRefreshToken, setToken } from "@/app/lib/auth";

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
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    console.log("Logged in");
    const { access, refresh } = responseData;
    setToken(access);
    setRefreshToken(refresh);
    return NextResponse.json({ loggedIn: true }, { status: 200 });
  }

  return NextResponse.json(
    { loggedIn: false, ...responseData },
    { status: 400 }
  );
}
