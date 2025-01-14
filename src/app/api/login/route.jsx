"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  cookies().set({});
  return NextResponse.json("Hello world", { status: 200 });
}
