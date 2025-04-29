import { generateRandomCode } from "@/helpers/generateCode";
import database from "../config/mongodb";
import {
  Log,
  TicketInput,
  TicketOutput,
  TicketSchema,
} from "../schema/ticket_collection";
import { dateFormat } from "@/helpers/format";
import { ObjectId } from "mongodb";
import UserModel from "./UserModel";

class TicketModel {
  static collection() {
    return database.collection<TicketOutput>("tickets");
  }

  static async getAllTicket() {
    const tickets = await this.collection()
      .aggregate([
        {
          $lookup: {
            from: "customers",
            let: { customerIdStr: "$customerId" }, // ambil customerId string dari customer
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$customerIdStr" }],
                  },
                },
              },
              {
                $project: {
                  firstName: 1, // ambil field yang diperlukan aja
                  lastName: 1, // ambil field yang diperlukan aja
                },
              },
            ],
            as: "customerData",
          },
        },
        {
          $unwind: "$customerData",
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                "$$ROOT",
                {
                  customerData: {
                    firstName: "$customerData.firstName", // rename atau ambil field spesifik
                    lastName: "$customerData.lastName", // rename atau ambil field spesifik
                  },
                },
              ],
            },
          },
        },
      ])
      .toArray();

    return tickets;
  }

  static async getTicketById(id: string) {
    const ticket = await this.collection()
      .aggregate([
        {
          $match: { _id: new ObjectId(id) }, // filter berdasarkan id tiket
        },
        {
          $lookup: {
            from: "customers",
            let: { customerIdStr: "$customerId" }, // ambil customerId string dari customer
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$customerIdStr" }],
                  },
                },
              },
              {
                $project: {
                  firstName: 1, // ambil field yang diperlukan aja
                  lastName: 1, // ambil field yang diperlukan aja
                },
              },
            ],
            as: "customerData",
          },
        },
        {
          $unwind: "$customerData",
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                "$$ROOT",
                {
                  customerData: {
                    firstName: "$customerData.firstName", // rename atau ambil field spesifik
                    lastName: "$customerData.lastName", // rename atau ambil field spesifik
                  },
                },
              ],
            },
          },
        },
      ])
      .toArray();

    if (ticket.length === 0) {
      throw { message: "Data not found", status: 404 };
    }

    return ticket[0];
  }

  static async create(input: TicketInput, userId: string) {
    let code = await generateRandomCode();
    input.code = `TKT-${code}`;

    const userHandle = await UserModel.getUserById(userId);

    let log: Log = {
      date: new Date(),
      handleByUserId: userHandle._id.toString(),
      handleByUsername: userHandle.username,
      handleByUserRole: userHandle.role,
      note: `Ticket created and completed by ${
        userHandle.username
      } on ${dateFormat()}`,
      status: "Done",
    };

    const assignTo = "Helpdesk"; // ketika create kemudian di eskalasi, pasti assign ke Helpdesk

    // jika perlu eskalasi
    if (input.escalationRequired) {
      log = {
        ...log,
        // approveByUserId: "",
        // approveByUsername: "",
        // approveByUserRole: "",
        note: `Ticket created by ${
          userHandle.username
        } on ${dateFormat()} and assigned to ${assignTo}.`,
        assignTo,
        sla: "60 minutes", // hardcode sementara
        status: "Escalated",
      };
    }

    input.logs = [log];
    input.assignTo = assignTo;

    const data = TicketSchema.parse({
      ...input,
    });

    await this.collection().insertOne({ ...data });

    return { code: input.code };
  }

  static async update(input: TicketInput, id: string) {
    // const ticket = await this.collection()
    //   .find({ _id: new ObjectId(id) })
    //   .toArray();
    // if (!ticket.length || ticket[0]?.isDeleted === true) {
    //   throw {
    //     message: "Ticket not found or already deleted",
    //     status: 400,
    //   };
    // }
    // // proses update bisa dilakukan selama status ticket masih Open atau baru dibuat
    // if (ticket[0].status !== "Open") {
    //   throw {
    //     message:
    //       "This ticket is already being processed and cannot be updated.",
    //     status: 400,
    //   };
    // }
    // input.log = [...(ticket[0].log || [])];
    // const userHandle = await UserModel.getUserById("67ff7fd7e32957a1af4b0231"); // hardcode dulu
    // const userAssign = await UserModel.getUserById(input.assignToId);
    // // kondisi jika mengganti assign to
    // if (input.assignToId !== ticket[0].assignToId) {
    //   let previousLog = input.log[input.log.length - 1];
    //   let previousUserAssign = await UserModel.getUserById(
    //     previousLog.assignToUserId
    //   );
    //   const log: Log = {
    //     date: new Date(),
    //     handleByUserId: userHandle._id.toString(),
    //     handleByUsername: userHandle.username,
    //     handleByRole: userHandle.role,
    //     assignToUserId: input.assignToId,
    //     assignToUsername: userAssign.username,
    //     assignToRole: userAssign.role,
    //     note: `The ticket assign updated by ${userHandle.username}, changing from ${previousUserAssign.username} (${previousUserAssign.role}) to ${userAssign.username} (${userAssign.role}).`, // catatan apa yang sudah dilakukan
    //     status: "Open",
    //   };
    //   input.log?.push(log);
    // }
    // // kondisi jika update status
    // if (input.status !== "Open") {
    //   const log: Log = {
    //     date: new Date(),
    //     handleByUserId: userHandle._id.toString(),
    //     handleByUsername: userHandle.username,
    //     handleByRole: userHandle.role,
    //     assignToUserId: input.assignToId,
    //     assignToUsername: userAssign.username,
    //     assignToRole: userAssign.role,
    //     note: `The ticket status was updated by ${userHandle.username}, changing from ${ticket[0].status} to ${input.status}.`, // catatan apa yang sudah dilakukan
    //     status: "Open",
    //   };
    //   input.log?.push(log);
    // }
    // const data = TicketSchema.parse({
    //   ...input,
    // });
    // data.updatedAt = new Date();

    // const result = await this.collection().findOneAndUpdate(
    //   { _id: new ObjectId(id) },
    //   { $set: data },
    //   { returnDocument: "after" }
    // );
    // // 6. cek hasil dan return
    // if (!result?._id) {
    //   throw { message: "Ticket not found or not updated", status: 400 };
    // }
    // return result;
    return { code: "aaa" };
  }

  static async delete(id: string) {
    const findTicket = await this.collection().findOne({
      _id: new ObjectId(id),
    });

    if (!findTicket) {
      throw { message: "Data not found", status: 404 };
    }

    const isNowDeleted = !findTicket.isDeleted;
    const lastLog = findTicket.logs?.[findTicket.logs.length - 1];
    const status = findTicket.isDeleted ? lastLog?.status : "Closed";

    const result = await this.collection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          isDeleted: isNowDeleted,
          status,
          deletedAt: isNowDeleted ? new Date() : null,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result?._id) {
      throw { message: "Ticket not found or already deleted", status: 404 };
    }

    return result;
  }

  static async escalatedTicket(id: string) {
    const [ticket] = await this.collection()
      .find({ _id: new ObjectId(id) })
      .toArray();

    if (!ticket || ticket.isDeleted === true) {
      throw {
        message: "Ticket not found or already deleted",
        status: 400,
      };
    }

    const assignTo =
      ticket.assignTo === "Helpdesk"
        ? "NOC"
        : ticket.assignTo === "NOC"
        ? "Super NOC"
        : ticket.assignTo;

    const sla =
      assignTo === "NOC"
        ? "90 Minutes"
        : assignTo === "Super NOC"
        ? "120 Minutes"
        : "-";

    console.log("hahahahahahz", sla, assignTo);

    const userHandle = await UserModel.getUserById("680dafa85379214c326caf46"); // hardcode dulu => user login (helpdesk)

    let log: Log = {
      date: new Date(),
      handleByUserId: userHandle._id.toString(),
      handleByUsername: userHandle.username,
      handleByUserRole: userHandle.role,
      note: `Ticket escalated by ${userHandle.username} (${userHandle.role}), reassigned from ${ticket.assignTo} to ${assignTo}`,
      status: "Escalated",
      sla,
    };

    const result = await this.collection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          updatedAt: new Date(),
          assignTo,
        },
        $push: {
          logs: log,
        },
      },
      { returnDocument: "after" }
    );

    if (!result?._id) {
      throw { message: "Ticket not found or not updated", status: 400 };
    }

    return result;
  }

  static async updateStatus(status: string, id: string, userId: string) {
    const [ticket] = await this.collection()
      .find({ _id: new ObjectId(id) })
      .toArray();

    if (!ticket || ticket.isDeleted === true) {
      throw {
        message: "Ticket not found or already deleted",
        status: 400,
      };
    }

    const userHandle = await UserModel.getUserById(userId); // hardcode dulu => user login (helpdesk)

    const sla =
      ticket.assignTo === "Helpdesk"
        ? "90 Minutes"
        : ticket.assignTo === "NOC"
        ? "120 Minutes"
        : "60 Minutes";

    let log: Log = {
      date: new Date(),
      handleByUserId: userHandle._id.toString(),
      handleByUsername: userHandle.username,
      handleByUserRole: userHandle.role,
      note: `Ticket processed by ${userHandle.username} (${
        userHandle.role
      }) on ${dateFormat()}`,
      status,
      sla,
    };

    const result = await this.collection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          updatedAt: new Date(),
        },
        $push: {
          logs: log,
        },
      },
      { returnDocument: "after" }
    );

    if (!result?._id) {
      throw { message: "Ticket not found or not updated", status: 400 };
    }

    return result;
  }
}

export default TicketModel;
