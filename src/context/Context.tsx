import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { BsWindowSidebar } from "react-icons/bs";
import {
  IFormCreateAnnouncement,
  IFormUpdateAnnouncement,
  IEditUserProfile,
} from "../interfaces/components";
import {
  IAnnouncement,
  IAnnouncer,
  IContext,
  ICreateUser,
  IProvider,
} from "../interfaces/context";
import { api } from "../service/api";
import { AuthContext } from "./AuthContext";

export const Context = createContext({} as IContext);

export const Provider = ({ children }: IProvider) => {
  useEffect(() => {
    api
      .get("/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((error) => console.log(error));
  }, []);

  const { setUser, user } = useContext(AuthContext);

  const token = localStorage.getItem("@token");

  const [isModalProfileOpen, setModalProfile] = useState(false);
  const [isModalAddressOpen, setModalAddress] = useState(false);
  const [isModalRemoveUserOpen, setModalRemoveUser] = useState(false);
  const [announcer, setAnnouncer] = useState<IAnnouncer>({} as IAnnouncer);

  const [suggestion, setSuggestion] = useState<string>("");

  const [showAddAnnouncementModal, setShowAddAnnouncementModal] =
    useState<boolean>(false);

  const [showEditAnnouncementModal, setShowEditAnnouncementModal] =
    useState<boolean>(false);

  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

  const [announcementId, setAnnouncementId] = useState<string>("");

  const [announcementDetail, setAnnouncementDetail] = useState<IAnnouncement>(
    {} as IAnnouncement
  );

  const [showModalAddAnnouncementSuccess, setShowModalAddAnnouncementSuccess] =
    useState<boolean>(false);

  const [showModalDeleteAnnouncement, setShowModalDeleteAnnouncement] =
    useState<boolean>(false);

  const getAllAnnouncements = async () => {
    await api
      .get("/announcements")
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((error) => console.log(error));
  };

  const createAnnouncement = (data: IFormCreateAnnouncement) => {
    const token = localStorage.getItem("@token");

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { first_photo_gallery, photos_gallery, ...rest } = data;

    let gallery = [];

    data.photos_gallery.map((value: string) => gallery.push({ image: value }));

    gallery.unshift({ image: data.first_photo_gallery });

    const newData = { ...rest, gallery };

    api
      .post("/announcements", newData)
      .then((res) => {
        setShowAddAnnouncementModal(false);
        setShowModalAddAnnouncementSuccess(true);
        retrieveAnnouncer(user?.id!);
      })
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  const updateAnnouncement = (data: IFormUpdateAnnouncement) => {
    const { first_photo_gallery, photos_gallery, is_active, ...rest } = data;

    let boolean_is_active = is_active == "yes" ? true : "false";

    let gallery = [];

    data.photos_gallery?.map((value: string) => gallery.push(value));

    gallery.unshift(data.first_photo_gallery);

    const newData = { ...rest, is_active: boolean_is_active, gallery };

    api
      .patch(`/announcements/${announcementId}`, newData)
      .then((res) => {
        toast.success("Anúncio atualizado");
        retrieveAnnouncer(user?.id!);
        setShowEditAnnouncementModal(false);
      })
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  const deleteAnnouncement = (id: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api
      .delete(`/announcements/${id}`)
      .then((res) => {
        toast.success("Anúncio exclúido");
        retrieveAnnouncer(user?.id!);
        setTimeout(() => setShowModalDeleteAnnouncement(false), 2000);
      })
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  const checkCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const retrieveAnnouncer = (id: string) => {
    api
      .get(`/users/${id}`)
      .then((res) => {
        setAnnouncer(res.data);
      })
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  const retrieveAnnouncement = (id: string) => {
    api
      .get(`announcements/${id}`)
      .then((res) => setAnnouncementDetail(res.data))
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  const createComment = (data: string, id: string) => {
    const newData = { description: data };

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api.post(`/comments/${id}`, newData).then((res) => {
      toast.success("Comentário criado");
      retrieveAnnouncement(id);
      setSuggestion("");
    });
  };

  const updateUser = (data: IEditUserProfile) => {
    const token = localStorage.getItem("@token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api
      .patch(`/users`, data)
      .then((response) => {
        toast.success("Dados editados com sucesso!");
        setUser(response.data);
        setModalProfile(false);
        setModalAddress(false);
      })
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  const updateComment = (data: string, id: string) => {
    const newData = { description: data };

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api
      .patch(`/comments/${id}`, newData)
      .then((res) => {
        toast.success("Comentário atualizado");
        console.log(res.data.announcement);
        retrieveAnnouncement(res.data.announcement);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        console.log(error, newData);
      });
  };

  const deleteUser = () => {
    const token = localStorage.getItem("@token");

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api
      .delete(`/users`)
      .then((response) => {
        toast.success("Sua conta foi deletada!");
        setModalRemoveUser(false);
        setModalProfile(false);
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  const deleteComment = (announcementId: string, id: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api
      .delete(`/comments/${id}`)
      .then((res) => {
        toast.success("Comentário excluído");
        console.log(res);
        retrieveAnnouncement(announcementId);
      })
      .catch((error) => toast.error(`${error.response.data.message}`));
  };

  return (
    <Context.Provider
      value={{
        showAddAnnouncementModal,
        setShowAddAnnouncementModal,
        announcements,
        setAnnouncements,
        getAllAnnouncements,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        checkCep,
        showEditAnnouncementModal,
        setShowEditAnnouncementModal,
        announcementId,
        setAnnouncementId,
        isModalProfileOpen,
        setModalProfile,
        setShowModalAddAnnouncementSuccess,
        updateUser,
        isModalAddressOpen,
        setModalAddress,
        showModalAddAnnouncementSuccess,
        showModalDeleteAnnouncement,
        setShowModalDeleteAnnouncement,
        announcer,
        setAnnouncer,
        retrieveAnnouncer,
        retrieveAnnouncement,
        announcementDetail,
        setAnnouncementDetail,
        suggestion,
        setSuggestion,
        createComment,
        isModalRemoveUserOpen,
        setModalRemoveUser,
        deleteUser,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </Context.Provider>
  );
};
