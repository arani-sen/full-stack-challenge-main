# Orderbook Widget

## Introduction

This is my attempt at the Bastion Take Home task. I have updated the code so that there is an Order Book widget.

Run `npm run dev` to start application\
Go to `http://localhost:5173/` in your browser to see the widget go.



https://github.com/arani-sen/full-stack-challenge-main/assets/20361534/56ae982d-e00b-45ea-bd2f-2ca26099e1e6



## Instructions for task

As a Fullstack Engineer at Bastion Platforms, you will spend a significant amount of time building single-page applications and supporting APIs. For this assessment, we’d like you to create a single-page application, built in React, that connects to the bitmex `XBTUSDT` public websocket feed and displays the price feed as an orderbook.

There is a bare-bones example of connecting to the websocket feed implemented in [`App.tsx`](https://github.com/bastionplatforms/fullstack-challenge/blob/main/src/App.tsx) - feel free to modify it as you wish.

Examples of this widget can be seen at any of the major cryptocurrency exchanges. Below are some examples:

https://pro.coinbase.com/trade/ETH-USD

https://www.bitmex.com/app/trade/ETHUSDT

https://www.binance.com/en/trade/ETH_USDT?theme=dark&type=spot

![alt text](https://i.imgur.com/wsJMQBG.jpg)

### Some useful definitions:

- Size: The sum of the order quantities at a given price.
- Mid Price: The hypothetical price between the best sell order and the best buy order on the orderbook.

### The widget should:

- Use React
- Use Typescript
- Be Visually appealing
- Use level 2 price data to display a live updating orderbook widget.
- Display a live updating mid price

Please spend no more than 4 hours on the project, upload your work to a github repo, and share it with us upon completion.
