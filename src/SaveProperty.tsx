"use client";

import { useState } from "react";

export const SaveProperty = ({ id }: { id: string }) => {
  const [saved, setSaved] = useState(false);
  console.log("Render SaveProperty");
  return (
    <button onClick={() => setSaved((value) => !value)}>
      {saved ? "Saved!" : `Save ${id}`}
    </button>
  );
};
