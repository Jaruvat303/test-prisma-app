import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {


  try {
    const category = await prisma.category.findMany()
    
    return Response.json(category);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();

  try {
    const newPost = await prisma.category.create({
      data: { name },
    });

    return Response.json(newPost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
