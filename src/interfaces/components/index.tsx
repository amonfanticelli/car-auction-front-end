import { IGallery } from "../context";

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  id?: string;
  color: string;
  background: string;
  border_color: string;
  background_hover?: string;
  color_hover?: string;
  border_hover?: string;
  disable?: string;
  width?: string;
  height?: string;
  lower_width?: string;
}

export interface IButtonStyleProps {
  color: string;
  background: string;
  border_color?: string;
  background_hover?: string;
  color_hover?: string;
  border_hover?: string;
  disable?: string;
  width?: string;
  height?: string;
  lower_width?: string;
  onClick?: () => void;
}

export interface IFormCreateAnnouncement {
  title: string;
  year: string;
  km: string;
  price: string;
  description: string;
  type_vehicle: string;
  image: string;
  first_photo_gallery: string;
  photos_gallery: [];
}

export interface IFormUpdateAnnouncement {
  title?: string;
  year?: string;
  km?: string;
  price?: string;
  description?: string;
  type_vehicle?: string;
  is_active?: string;
  image?: string;
  first_photo_gallery?: string;
  photos_gallery?: [];
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IEditUserProfile {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birthdate?: string;
  description?: string;
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: number;
  complement?: string;
}

export interface IComment {
  id?: string;
  description: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
  paramsId?: string;
}
