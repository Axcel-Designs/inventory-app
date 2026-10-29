import { createContext, useContext } from "react";

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setloading] = useState(true);

  return (
    <authContext.Provider value={{ user, loading }}>
      {children}
    </authContext.Provider>
  );
}
