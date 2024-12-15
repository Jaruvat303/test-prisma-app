import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category')
  const sort = searchParams.get('sort') || 'desc'

  let whereCondition = category ? {
    category:{
      is:{
        name:category
      }
    },
    title: {
      contains: search,
      mode: 'insensitive'
    }
  } : {
    title: {
      contains: search,
      mode: 'insensitive'
    }
  }


  try {
    const posts = await prisma.post.findMany({
      where: whereCondition as any,
      orderBy: {
        createdAt: sort,
      } as any,
      include: {category:true}
    });
    return Response.json(posts);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const { title, content, categoryId, } = await request.json();

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        categoryId : Number(categoryId),
      },
    });

    return Response.json(newPost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
