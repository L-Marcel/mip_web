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

export enum MarkerIcon {
 "red:book-reader:Aula",
 "darkred:user-md:Saúde",
 "darkred:dumbbell:Academia",
 "orange:store:Loja",
 "orange:palette:Design",
 "green:seedling:Plantas",
 "darkgreen:bread-slice:Padaria",
 "green:dog:Animais",
 "blue:glass-cheers:Eventos",
 "darkblue:concierge-bell:Hospedagem",
 "blue:hamburger:Comida",
 "purple:air-freshener:Beleza",
 "darkpurple:user-tie:Justiça",
 "cadetblue:screwdriver:Reparo",
 "cadetblue:address-card:Outros",
 "gray:hard-hat:Construção",
 "gray:car-side:Transporte",
 "black:laptop-code:Tecnologia",
};