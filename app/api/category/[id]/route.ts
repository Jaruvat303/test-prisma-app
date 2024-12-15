import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const categoryId = Number(params.id);
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        posts: true,
      },
    });

    return Response.json(category);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = Number(params.id);
    const { name } = await request.json();

    const updateCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
      },
    });

    return Response.json(updateCategory);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = Number(params.id);

    const deleteCategory = await prisma.category.delete({
      where: { id: categoryId },
    });

    return Response.json(deleteCategory);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
