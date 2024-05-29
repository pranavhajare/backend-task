import { Bid, Item, Notification } from '../models';
import { notifyUsers } from '../services/notification.service';

const getAllBids = async (req, res) => {
  const { itemId } = req.params;
  try {
    const bids = await Bid.findAll({ where: { itemId } });
    res.send(bids);
  } catch (error) {
    res.status(500).send(error);
  }
};

const placeBid = async (req, res) => {
  const { itemId } = req.params;
  const { bidAmount } = req.body;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    if (bidAmount <= item.currentPrice) {
      return res.status(400).send({ error: 'Bid amount must be higher than the current price' });
    }
    const bid = await Bid.create({ itemId, userId: req.user.id, bidAmount });
    item.currentPrice = bidAmount;
    await item.save();
    await Notification.create({
      userId: item.userId,
      message: `Your item "${item.name}" received a new bid of $${bidAmount}.`,
    });
    notifyUsers(itemId, bidAmount);
    res.status(201).send(bid);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default { getAllBids, placeBid };