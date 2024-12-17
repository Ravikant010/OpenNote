import React from "react";

type Props = {};

export default function NestedMenuHandle({ name }: { name: string }) {
  switch (name) {
    case "color":
      console.log("color");
      return <div>Color</div>
      break;
    default:
      break;
  }
}
