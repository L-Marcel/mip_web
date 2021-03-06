import { useContextSelector } from "use-context-selector";
import { AppContext } from "../context/AppContext";

export function useUser() {
 const user = useContextSelector(AppContext, con => con.user);
 const setUser = useContextSelector(AppContext, con => con.setUser);
 const isAdm = useContextSelector(AppContext, con => con.isAdm);

 return {
  user,
  setUser,
  isAdm
 };
};