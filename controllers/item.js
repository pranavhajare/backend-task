import { Item } from '../models';

const getAllItems = async (req, res) => {
    const { search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const where = {};
  
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }
  
    if (minPrice) {
      where.currentPrice = { [Op.gte]: minPrice };
    }
  
    if (maxPrice) {
      where.currentPrice = { [Op.lte]: maxPrice };
    }
  
    try {
      const items = await Item.findAndCountAll({
        where,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
      res.send({
        items: items.rows,
        totalItems: items.count,
        totalPages: Math.ceil(items.count / limit),
        currentPage: parseInt(page, 10),
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createItem = async (req, res) => {
  const { name, description, startingPrice, endTime } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  try {
    const item = await Item.create({ name, description, startingPrice, currentPrice: startingPrice, endTime, imageUrl });
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, startingPrice, currentPrice, endTime } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    if (imageUrl) item.imageUrl = imageUrl;
    item.name = name;
    item.description = description;
    item.startingPrice = startingPrice;
    item.currentPrice = currentPrice;
    item.endTime = endTime;
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    await item.destroy();
    res.send({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getAllItems, getItemById, createItem, updateItem, deleteItem };