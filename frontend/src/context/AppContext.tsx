import { createContext, useContext, useState } from "react";

interface AppContextType {
  backendUrl: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userData: any;
  setUserData: (value: any) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = (props: React.PropsWithChildren) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Load from localStorage if available
  const savedUserData = localStorage.getItem("userData");
  const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(savedIsLoggedIn);
  const [userData, setUserDataState] = useState<any>(
    savedUserData ? JSON.parse(savedUserData) : null
  );

  const setIsLoggedIn = (value: boolean) => {
    setIsLoggedInState(value);
    localStorage.setItem("isLoggedIn", value.toString());
    if (!value) {
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
    }
  };

  const setUserData = (value: any) => {
    setUserDataState(value);
    localStorage.setItem("userData", JSON.stringify(value));
  };

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
