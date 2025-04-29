import TicketModel from "@/db/models/TicketModel";
import { TicketInput } from "@/db/schema/ticket_collection";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/type";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const tickets = await TicketModel.getAllTicket();

    return Response.json(tickets);
  } catch (error) {
    return customError(error as CustomError);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const body = await request.json();

    const input: TicketInput = {
      customerId: body.customerId,
      ticketCategory: body.ticketCategory,
      escalationRequired: body.escalationRequired,
      subject: body.subject,
      description: body.description,
    };

    let ticket = await TicketModel.create(input, userId);

    return Response.json(
      {
        message: `Successfully create a new ticket with code: ${ticket.code}`,
      },
      { status: 201 }
    );
  } catch (error) {
    return customError(error as CustomError);
  }
}
