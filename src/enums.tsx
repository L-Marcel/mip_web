export function enumToStringArray(e: any): string[] {
 let arr = [];

 for(let i in e){
  if (typeof e[i] !== "number") {
   arr.push(e[i]);
  }
 }

 return arr;
};

export function numberToEnumValue(n: number, e: any){
 for(let i in e){
  if(e[i] === n){
   return i;
  }
 }

 return undefined;
};

export enum ProductType { 
 "Item",
 "Serviço"
};