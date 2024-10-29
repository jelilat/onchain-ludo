# Multiplayer Ludo Game with Prediction Market

This project is a multiplayer Ludo game powered by zk proofs and enhanced with a prediction market feature. Players can join a game room, play Ludo, and spectators can stake tokens to predict the winner.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Multiplayer Ludo Game

- **Join or Create a Room**: Players can create a new game room or join an existing one using a room code.
- **Real-time Gameplay**: The game supports real-time interactions using WebSockets, allowing players to see each other's moves instantly.
- **Player Colors**: Each player is assigned a unique color (red, green, yellow, or blue) to represent them on the board.

## Prediction Market

- **Stake Tokens**: Spectators can stake tokens on the player they believe will win the game.
- **Market Dynamics**: The prediction market adjusts odds based on the stakes placed, providing a dynamic betting experience.
- **Win Rewards**: Correct predictions are rewarded with tokens, incentivising participation and engagement.

Link to the [zk prover and verifier](https://github.com/jelilat/ludo-zk)
Link to the [websocket server](https://github.com/jelilat/ludo-server)