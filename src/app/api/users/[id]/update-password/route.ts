import UserModel from "@/db/models/UserModel";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/type";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

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

    let result = await UserModel.updatePassword(body, id);

    return Response.json(
      {
        message: `Successfully update password user with email: ${result.email}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return customError(error as CustomError);
  }
}
