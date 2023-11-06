import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


// if request is not added as a parameter nextjs will cache it so to prevent caching we still add it
export async function GET(request: NextRequest) {
   const users = await prisma.user.findMany({ orderBy: { name: 'asc'}})

   return NextResponse.json(users)
}