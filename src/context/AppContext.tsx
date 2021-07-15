import { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';

export const AppContext = createContext({} as AppContextType);

export function AppProvider(props: { children: any }) {
 const [user, setUser] = useState<User>();

 const _setUser = useCallback((user: User) => {
  setUser(user);
 }, []);

 return(
  <AppContext.Provider
   value={{
    user,
    setUser: _setUser,
   }}
  >
   {props.children}
  </AppContext.Provider>
 );
};