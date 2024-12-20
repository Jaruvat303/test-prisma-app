import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {
    const postId = Number((await params).id);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      }, include: {
        category: true
      }
    });

    return Response.json(post);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }

}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const postId = Number((await params).id);
    const { title, content, categoryId } = await request.json();

    const updatePort = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        categoryId: Number(categoryId),
      },
    });

    return Response.json(updatePort);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const postId = Number((await params).id);

    const deletePost = await prisma.post.delete({
      where: { id: postId },
    });

    return Response.json(deletePost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
