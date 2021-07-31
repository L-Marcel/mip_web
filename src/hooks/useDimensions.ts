import { useContextSelector } from "use-context-selector";
import { AppContext } from "../context/AppContext";

export function useDimensions() {
 const dimensions = useContextSelector(AppContext, con => con.dimensions);

 return dimensions;
};