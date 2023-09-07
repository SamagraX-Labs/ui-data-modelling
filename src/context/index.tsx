import { createContext, useContext, useState } from 'react';

export const Context = createContext<any>(null);

export function StateProvider({ children }: any) {
  const [data, setData] = useState({});

  return (
    <Context.Provider
      value={{
        data,
        setData,
      }}>
      {children}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}