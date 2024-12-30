import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listItems = await prisma.listItem.findMany();

    return NextResponse.json({ data: listItems });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const listItem = await prisma.listItem.create({
      data: {
        name: res.name,
        done: false,
      },
    });

    return NextResponse.json({ data: listItem });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    const listItem = await prisma.listItem.update({
      where: { id: res.id },
      data: {
        done: res.done,
      },
    });

    return NextResponse.json({ data: listItem });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();

    await prisma.listItem.delete({
      where: { id: res.id },
    });

    return NextResponse.json({ data: "Item deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
