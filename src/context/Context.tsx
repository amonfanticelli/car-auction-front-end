import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  IFormCreateAnnouncement,
  IFormUpdateAnnouncement,
} from "../interfaces/components";
import { IAnnouncement, IContext, IProvider } from "../interfaces/context";
import { api } from "../service/api";

export const Context = createContext({} as IContext);

export const Provider = ({ children }: IProvider) => {
  useEffect(() => {
    api
      .get("/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [showAddAnnouncementModal, setShowAddAnnouncementModal] =
    useState<boolean>(false);

  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

  const getAllAnnouncements = () =>
    api
      .get("/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((error) => console.log(error));

  const createAnnouncement = async (data: IFormCreateAnnouncement) =>
    await api
      .post("/announcements", data)
      .then((res) => {
        setAnnouncements((old) => [...old, res.data]);
        toast.success("Anúncio criado com sucesso!");
      })
      .catch((error) => toast.error(`${error.response.data.message}`));

  const updateAnnouncement = async (
    data: IFormUpdateAnnouncement,
    id: string
  ) =>
    await api
      .patch(`/announcements/${id}`, data)
      .catch((error) => toast.error(`${error.response.data.message}`));

  const deleteAnnouncement = async (id: string) =>
    await api
      .delete(`/announcements/${id}`)
      .catch((error) => toast.error(`${error.response.data.message}`));

  return (
    <Context.Provider
      value={{
        showAddAnnouncementModal,
        setShowAddAnnouncementModal,
        announcements,
        setAnnouncements,
        createAnnouncement,
        getAllAnnouncements,
        updateAnnouncement,
        deleteAnnouncement,
      }}
    >
      {children}
    </Context.Provider>
  );
};
