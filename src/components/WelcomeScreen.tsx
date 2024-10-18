"use client";
import React, { useState } from "react";

const WelcomeScreen: React.FC = () => {
  const [gameBoard, setGameBoard] = useState<boolean>(false);

  return (
    <div>
      {!gameBoard && (
        <div className="welcome" style={{ display: "" }}>
          <div className="menu">
            <div className="lobby">
              <h2 className="super-center text-2xl font-semibold">
                Play Ludo Offline
              </h2>
              <div className="control3">
                <div className="lb">
                  <button
                    id="move-blue1"
                    className="player playersel bg-red"
                  ></button>
                  &nbsp;&nbsp;
                  <span id="red_player_name" className="f">
                    <input type="text" className="cun" />
                    <button className="bot botoff"></button>
                  </span>
                </div>
                <div className="lb">
                  <button
                    id="move-blue2"
                    className="player playersel bg-green"
                  ></button>
                  &nbsp;&nbsp;
                  <span id="green_player_name" className="f">
                    <input type="text" className="cun" />
                    <button className="bot botoff"></button>
                  </span>
                </div>
                <div className="lb">
                  <button
                    id="move-blue3"
                    className="player playersel bg-yellow"
                  ></button>
                  &nbsp;&nbsp;
                  <span id="yellow_player_name" className="f">
                    <input type="text" className="cun" />
                    <button className="bot botoff"></button>
                  </span>
                </div>
                <div className="lb">
                  <button
                    id="move-blue4"
                    className="player playersel bg-blue"
                  ></button>
                  &nbsp;&nbsp;
                  <span id="blue_player_name" className="f">
                    <input type="text" className="cun" />
                    <button className="bot botoff"></button>
                  </span>
                </div>
              </div>
              <div className="super-center">
                <button id="start_btn" onClick={() => setGameBoard(true)}>
                  Start Game
                </button>
                <button id="loading_btn" style={{ display: "none" }} disabled>
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <span className="font-semibold">KEYBOARD CONTROLS</span> <br />
              <span className="bg-black text-white px-2 py-1 rounded-md">
                Space
              </span>{" "}
              for dice &{" "}
              <span className="bg-black text-white p-1 rounded-md">1</span>{" "}
              <span className="bg-black text-white p-1 rounded-md">2</span>{" "}
              <span className="bg-black text-white p-1 rounded-md">3</span>{" "}
              <span className="bg-black text-white p-1 rounded-md">4</span> for
              players
            </div>
            <hr className="my-4 border-black" />
            <div className="super-center">
              Developed By @tjelailah /&nbsp;
              <a
                href="https://x.com/tjelailah"
                className="text-decoration-none underline"
                target="_blank"
              >
                Follow
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
