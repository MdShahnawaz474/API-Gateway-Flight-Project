const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger-config");
const AppError = require("../utils/errors/appError");

class crudRepository {
  constructor(model) {
    if (!model) {
      throw new Error("Model is required to instantiate CrudRepository");
    }
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      // logger.error("something went wrong in the crud repo :create", { error });
      // console.log(error.message);

      throw error;
    }
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });

    if (!response) {
      throw new AppError(
        "Not able to find the resources",
        StatusCodes.NOT_FOUND,
      );
    }

    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError("Flight not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll(data) {
    const response = await this.model.findAll(data);
    return response;
  }
  async update(id, data) {
    const resource = await this.model.findByPk(id);

    if (!resource) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND,
      );
    }

    await resource.update(data);
    return resource;
  }
}

module.exports = crudRepository;
