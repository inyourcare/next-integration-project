import { ImageResponse } from "@vercel/og";
import React from "react";

export const config = {
  // runtime: 'edge',
  runtime: "experimental-edge",
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        대구 창조 경제
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
