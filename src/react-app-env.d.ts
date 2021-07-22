/// <reference types="react-scripts" />

declare interface ProductModalProps {
  show: boolean,
  defaultProduct: Product,
  onFinish?: (product: Product) => void,
  onClose?: () => void,
}
declare interface UserModalProps {
  show: boolean,
  defaultUser: User,
  onFinish?: (user: User) => void,
  onClose?: () => void,
}

declare type Credentials = {
  email: string,
  password: string,
} 

declare type User = {
 id?: number,
 name: string,
 email: string,
 password?: string,
 phone: string,
}

declare type Product = Item | Service;

declare type Item = {
 job: number,
 type: "Item",
 id?: number,
 name: string,
 description?: string,
 price: number,
 delivery: boolean,
 unit: number,
}

declare type Service = {
  job: number,
  type: "Serviço",
  id?: number,
  name: string,
  description?: string,
  price: number,
}

declare type AppContextType = {
 user: User | undefined,
 setUser: (user: User | undefined, keep: boolean) => void,
}