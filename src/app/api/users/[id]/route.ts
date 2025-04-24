import UserModel from "@/db/models/UserModel";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/type";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      Response.json({ message: `Invalid ID` }, { status: 400 });
    }

    let result = await UserModel.getUserById(id);

    return Response.json(result);
  } catch (error) {
    return customError(error as CustomError);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      Response.json({ message: `Invalid ID` }, { status: 400 });
    }

    const body = await request.json();

    let result = await UserModel.update(body, id);

    return Response.json(
      { message: `Successfully update user with email: ${result.email}` },
      { status: 200 }
    );
  } catch (error) {
    return customError(error as CustomError);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      Response.json({ message: `Invalid ID` }, { status: 400 });
    }

    let result = await UserModel.delete(id);

    let text = result.isDeleted ? "delete" : "restore";

    return Response.json(
      {
        message: `Successfully ${text} user with email: ${result.email}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return customError(error as CustomError);
  }
}
