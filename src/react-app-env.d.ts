/// <reference types="react-scripts" />
declare module "leaflet.awesome-markers/dist/leaflet.awesome-markers";
declare module "cpf-cnpj-validator";
declare interface ValidationDetail {
  message: string,
  path: string[],
  type: string,
  context: {
    label: string,
    value: any,
    key: string
  }
}

declare interface JobRegisterMapProps extends MapProps {
  job: Job,
  onChangeLatLng: (position: LatLngExpression) => void,
}
declare interface MapProps {
  dimensions: Dimensions,
  mh: number | undefined,
  ph: number | undefined,
}

declare interface ProductProps {
  title?: string,
  withinContainer?: boolean,
}

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

declare type Dimensions = {
  h: number;
  w: number;
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
  user?: number,
}

declare type Service = {
  job: number,
  type: "Serviço",
  id?: number,
  name: string,
  description?: string,
  price: number,
  user?: number,
}

declare type AppContextType = {
  user: User | undefined,
  setUser: (user: User | undefined, keep: boolean) => void,
  isAdm: boolean,
  dimensions: Dimensions,
}

declare type Job = {
  id?: number,
  name: string,
  CNPJ?: string,
  description?: string,
  lat: number,
  lng: number,
  icon: MakerIcon,
  user?: number
}