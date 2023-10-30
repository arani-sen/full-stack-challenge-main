import { t_Order, t_Order_Book, t_Order_Event } from "./OrderBook";

const recalculateMidPoint = (orderBook: t_Order_Book) => {
  const sells = Object.values(orderBook.Sell);
  const buys = Object.values(orderBook.Buy);

  if (buys.length < 25 || sells.length < 25) return;
  const bestSell = sells.sort((a, b) => b.price - a.price)[15];
  const bestBuy = buys.sort((a, b) => b.price - a.price)[15];

  const newMidPoint = (bestBuy.price + bestSell.price) / 2;

  orderBook.midPoint = newMidPoint;
};
const replaceBook = (bookData: t_Order[]): t_Order_Book => {
  const newBook = {
    Sell: {},
    Buy: {},
    loading: false,
    midPoint: 0,
  };

  bookData.forEach((order) => {
    if (order.side === "Sell") {
      newBook.Sell = { ...newBook.Sell, [order.id]: order };
    }
    if (order.side === "Buy") {
      newBook.Buy = { ...newBook.Buy, [order.id]: order };
    }
  });

  recalculateMidPoint(newBook);

  return newBook;
};
const updateBook = (
  currentBook: t_Order_Book,
  bookData: t_Order[]
): t_Order_Book => {
  const newOrderBook = { ...currentBook };
  bookData.forEach((order) => {
    const previous = currentBook[order.side][order.id];
    if (!previous) return currentBook;
    newOrderBook[order.side][order.id] = order;
  });

  recalculateMidPoint(newOrderBook);
  return newOrderBook;
};

const deleteOrder = (currentBook: t_Order_Book, bookData: t_Order[]) => {
  const newOrderBook = { ...currentBook };
  bookData.forEach((order) => {
    delete newOrderBook[order.side][order.id];
  });

  recalculateMidPoint(newOrderBook);
  return newOrderBook;
};

const insertOrder = (currentBook: t_Order_Book, bookData: t_Order[]) => {
  const newOrderBook = { ...currentBook };
  bookData.forEach((order) => {
    newOrderBook[order.side][order.id] = order;
  });

  recalculateMidPoint(newOrderBook);
  return newOrderBook;
};

export const orderBookReducer = (
  currentOrderBookState: t_Order_Book,
  event: t_Order_Event
) => {
  switch (event.action) {
    case "partial":
      return replaceBook(event.data);
    case "update":
      return updateBook(currentOrderBookState, event.data);
    case "delete":
      return deleteOrder(currentOrderBookState, event.data);
    case "insert":
      return insertOrder(currentOrderBookState, event.data);
    default:
      return currentOrderBookState;
  }
};
