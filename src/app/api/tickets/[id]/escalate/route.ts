import TicketModel from "@/db/models/TicketModel";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/type";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    console.log(id, "INI ID");

    if (!ObjectId.isValid(id)) {
      Response.json({ message: `Invalid ID` }, { status: 400 });
    }

    let result = await TicketModel.escalatedTicket(id);

    return Response.json(
      { message: `Successfully escalate ticket with code: ${result.code}` },
      { status: 200 }
    );
  } catch (error) {
    return customError(error as CustomError);
  }
}
