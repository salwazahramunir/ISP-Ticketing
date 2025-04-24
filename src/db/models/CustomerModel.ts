import { ObjectId } from "mongodb";
import database from "../config/mongodb";
import {
  CustomerInput,
  CustomerOutput,
  CustomerSchema,
} from "../schema/customer_collection";

class CustomerModel {
  static collection() {
    return database.collection<CustomerOutput>("customers");
  }

  static async create(input: CustomerInput) {
    const data = CustomerSchema.parse(input);

    const customer = await this.collection().findOne({
      idNumber: data.idNumber,
    });
    if (customer) {
      throw { message: "ID number already exists", status: 400 };
    }

    await this.collection().insertOne({ ...data });
  }

  static async getAllCustomer() {
    const customers = await this.collection()
      .aggregate([
        {
          $lookup: {
            from: "services",
            let: { serviceIdStr: "$serviceId" }, // ambil serviceId string dari customer
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$serviceIdStr" }],
                  },
                },
              },
              {
                $project: {
                  serviceName: 1, // ambil field yang diperlukan aja
                },
              },
            ],
            as: "serviceData",
          },
        },
        {
          $unwind: "$serviceData",
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                "$$ROOT",
                {
                  serviceData: {
                    name: "$serviceData.serviceName", // rename atau ambil field spesifik
                  },
                },
              ],
            },
          },
        },
      ])
      .toArray();

    return customers;
  }

  static async getCustomerById(id: string) {
    const customer = await this.collection()
      .find({ _id: new ObjectId(id), isDeleted: false })
      .toArray();

    return customer[0];
  }

  static async update(input: CustomerInput, id: string) {
    const customer = await this.collection()
      .find({ _id: new ObjectId(id) })
      .toArray();

    if (!customer.length || customer[0]?.isDeleted === true) {
      throw {
        message: "Customer not found or already deleted",
        status: 400,
      };
    }

    const data = CustomerSchema.parse(input);

    if (data.idNumber) {
      const existingCustomer = await this.collection().findOne({
        idNumber: data.idNumber,
        _id: { $ne: new ObjectId(id) }, // pastikan bukan customer ini sendiri
      });

      if (existingCustomer) {
        throw { message: "ID Number already in use", status: 400 };
      }
    }

    data.updatedAt = new Date();

    const result = await this.collection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );

    if (!result?._id) {
      throw { message: "Customer not found or not updated", status: 400 };
    }

    return result;
  }

  static async delete(id: string) {
    const findCustomer = await this.collection().findOne({
      _id: new ObjectId(id),
    });

    if (!findCustomer) {
      throw { message: "Customer not found", status: 404 };
    }

    const isNowDeleted = !findCustomer.isDeleted;
    const isActive = findCustomer.isDeleted === true ? "Active" : "Inactive";

    const result = await this.collection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: isActive,
          isDeleted: isNowDeleted,
          deletedAt: isNowDeleted ? new Date() : null,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result?._id) {
      throw { message: "Customer not found or already deleted", status: 404 };
    }

    return result;
  }
}

export default CustomerModel;
