import CustomerModel from "@/db/models/CustomerModel";
import { CustomerInput } from "@/db/schema/customer_collection";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/type";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: `Invalid ID` }, { status: 400 });
    }

    let customer = await CustomerModel.getCustomerById(id);

    return NextResponse.json(customer);
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
      return NextResponse.json({ message: `Invalid ID` }, { status: 400 });
    }

    const body = await request.json();

    const input: CustomerInput = {
      firstName: body.firstName,
      lastName: body.lastName ?? "",
      email: body.email ?? "",
      phoneNumber: body.phoneNumber,
      idType: body.idType,
      idNumber: body.idNumber,
      streetAddress: body.streetAddress,
      city: body.city,
      province: body.province,
      postalCode: body.province,
      country: body.country,
      serviceId: body.serviceId,
      installationDate: body.installationDate,
      contractLength: body.contractLength,
      note: body.note ?? "",
      status: body.status,
    };

    let result = await CustomerModel.update(input, id);

    return NextResponse.json(
      {
        message: `Successfully update customer with name: ${result.firstName}`,
      },
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
      return NextResponse.json({ message: `Invalid ID` }, { status: 400 });
    }

    let result = await CustomerModel.delete(id);

    let text = result.isDeleted ? "delete" : "restore";

    return NextResponse.json(
      {
        message: `Successfully ${text} customer with name: ${result.firstName}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return customError(error as CustomError);
  }
}
