import {
  IEditUserProfile,
  IFormCreateAnnouncement,
  IFormUpdateAnnouncement,
} from "../components";

export interface IProvider {
  children: React.ReactNode;
}

export interface IContext {
  suggestion: string;
  setSuggestion: React.Dispatch<React.SetStateAction<string>>;
  showAddAnnouncementModal: boolean;
  setShowAddAnnouncementModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModalAddAnnouncementSuccess: boolean;
  showEditAnnouncementModal: boolean;
  setShowEditAnnouncementModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModalDeleteAnnouncement: boolean;
  setShowModalDeleteAnnouncement: React.Dispatch<React.SetStateAction<boolean>>;
  announcements: IAnnouncement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<IAnnouncement[]>>;
  getAllAnnouncements: () => Promise<void>;
  createAnnouncement: (data: IFormCreateAnnouncement) => void;
  updateAnnouncement: (data: IFormUpdateAnnouncement, id: string) => void;

  deleteAnnouncement: (id: string) => void;
  checkCep: (e: React.ChangeEvent<HTMLInputElement>) => void;
  announcementId: string;
  setAnnouncementId: React.Dispatch<React.SetStateAction<string>>;
  isModalProfileOpen: boolean;
  setModalProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalAddAnnouncementSuccess: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  updateUser: (data: IEditUserProfile) => void;
  isModalAddressOpen: boolean;
  setModalAddress: React.Dispatch<React.SetStateAction<boolean>>;
  announcer: IAnnouncer;
  setAnnouncer: React.Dispatch<React.SetStateAction<IAnnouncer>>;
  retrieveAnnouncer: (id: string) => void;
  retrieveAnnouncement: (id: string) => void;
  announcementDetail: IAnnouncement;
  setAnnouncementDetail: React.Dispatch<React.SetStateAction<IAnnouncement>>;
  createComment: (data: string, id: string) => void;
  isModalRemoveUserOpen: boolean;
  setModalRemoveUser: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: () => void;
  updateComment: (data: string, id: string) => void;
  deleteComment: (annoucementId: string, id: string) => void;
}

export interface IAuthContext {
  handleRegister: (data: ICreateUser) => void;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export interface IAnnouncement {
  id: string;
  title: string;
  year: number;
  km: number;
  price: number;
  description: string;
  createdAt: Date;
  type_vehicle: string;
  image: string;
  is_active: boolean;
  user: IUser;
  gallery: IGallery[];
  comments?: IComment[];
}

export interface IGallery {
  id: string;
  image: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: string;
  description?: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
  is_announcer: boolean;
  password: string;
  announcements?: IAnnouncement[];
}

export interface IAnnouncementResponse {
  id: string;
  title: string;
  year: number;
  km: number;
  price: number;
  description: string;
  createdAt: Date;
  type_vehicle: string;
  image: string;
  is_active: boolean;
  user: IUser;
  gallery?: string[];
}

export interface ICreateUser {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: string;
  description?: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
  is_announcer: string;
  password: string;
  passwordCheck?: string;
}

export interface IAnnouncer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: string;
  description?: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
  is_announcer: boolean;
  announcements: IAnnouncement;
}

export interface IComment {
  id: string;
  description: string;
  createdAt: Date;
  user: IUser;
}
