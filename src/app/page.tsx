"use client";

import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

const TestContainer = () => {
  const [bgRandom, setBgRandom] = useState("#fff");

  function getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const rHex = r.toString(16).padStart(2, "0");
    const gHex = g.toString(16).padStart(2, "0");
    const bHex = b.toString(16).padStart(2, "0");

    return `#${rHex}${gHex}${bHex}`;
  }

  const handleChangeColor = async () => {
    const generatedColor = getRandomColor();

    const alreadyCreatedColor = await getDoc(doc(db, "color", "1"));

    if (alreadyCreatedColor.exists()) {
      await updateDoc(doc(db, "color", "1"), {
        color: {
          hex: generatedColor,
        },
      });
    } else {
      await setDoc(doc(db, "color", "1"), {
        color: {
          hex: generatedColor,
        },
      });
    }

    setBgRandom(generatedColor);
  };

  useEffect(() => {
    const getColor = () => {
      const unsub = onSnapshot(doc(db, "color", "1"), (doc) => {
        const { color } = doc.data() as { color: { hex: string } };
        setBgRandom(color.hex);
      });

      return () => {
        unsub();
      };
    };

    getColor();
  }, []);

  return (
    <div
      className="h-screen"
      style={{ backgroundColor: bgRandom }}
      onClick={() => handleChangeColor()}
    ></div>
  );
};

export default TestContainer;
