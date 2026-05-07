import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [open,setOpen] = useState(false);
  const change = () => setIsDark((pre) => !pre);
  const openClose = () => setOpen(pre => !pre)

  return (
    <Context.Provider value={{ isDark, change,open,openClose }}>{children}</Context.Provider>
  );
};

export default Context;
