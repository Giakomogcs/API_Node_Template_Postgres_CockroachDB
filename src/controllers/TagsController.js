const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class TagsController {
  async create(request, response) {
    const {
      patrimony,
      tag_id,
      description,
      responsible,
      last_read,
      is_active,
    } = request.body;

    const checkTagExists = await knex("tags").where({ tag_id });

    if (checkTagExists.length > 0) {
      throw new AppError("Essa tag já está em uso");
    }

    const checkPatrimonyExists = await knex("tags").where({ patrimony });

    if (checkPatrimonyExists.length > 0) {
      throw new AppError("Esse patrimonio já está em uso");
    }

    if (!patrimony || !tag_id) {
      throw new AppError("Numero do patrimônio ou numero de Tag é obrigatório");
    }

    const [tag] = await knex("tags")
      .insert({
        patrimony,
        tag_id,
        description,
        responsible,
        last_read: new Date(),
        is_active,
      })
      .returning("id");

    response.status(201).json({ tag });
  }

  async update(request, response) {
    const { id } = request.params;
    const currentTimestamp = new Date();

    const tag = await knex("tags").where({ id }).first();

    if (!tag) {
      throw new AppError("Não foi possível encontrar a tag", 401);
    }

    tag.is_active = !tag.is_active;
    tag.last_read = currentTimestamp;

    await knex("tags").update(tag).where({ id });

    return response.status(200).json(tag);
  }

  async delete(request, response) {
    const { id } = request.params;

    const tag = await knex("tags").where({ id }).first();

    if (!tag) {
      throw new AppError("Não foi possível encontrar a tag", 401);
    }

    await knex("tags").where({ id }).delete();

    return response.json("Produto deletado!");
  }

  async index(request, response) {
    let tags = await knex("tags");

    return response.status(200).json(tags);
  }
}
module.exports = TagsController;
