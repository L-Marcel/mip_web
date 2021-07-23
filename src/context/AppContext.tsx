import { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';
import checkIsAdm from '../services/administration';

export const AppContext = createContext({} as AppContextType);

export function AppProvider(props: { children: any }) {
 const [isAdm, setIsAdm] = useState<boolean>(false);
 const [user, setUser] = useState<User>();

 const _setUser = useCallback((user: User | undefined, keep: boolean) => {
  if(keep && user !== undefined){
   sessionStorage.setItem("mip@user", JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone
   }));
  }else{
   sessionStorage.removeItem("mip@user");
  };
  setUser(user);
  if(checkIsAdm(user)){
   setIsAdm(true);
  }else{
   setIsAdm(false);
  };
 }, []);

 return(
  <AppContext.Provider
   value={{
    user,
    setUser: _setUser,
    isAdm,
   }}
  >
   {props.children}
  </AppContext.Provider>
 );
};