"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SimpleContext = createContext({
  simple: false,
  setSimple: (v: boolean) => {},
});

export function useSimpleMode() {
  return useContext(SimpleContext);
}

export function SimpleModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [simple, setSimple] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("simple");
    if (stored === "true") setSimple(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("simple", simple.toString());
  }, [simple]);

  return (
    <SimpleContext.Provider value={{ simple, setSimple }}>
      {children}
    </SimpleContext.Provider>
  );
}
