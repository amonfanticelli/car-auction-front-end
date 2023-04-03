import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  AnnouncerPageStyle,
  AnnouncerPageWithoutTokenStyle,
  NameIconAnnouncer,
} from "./style";
import { Button } from "../../components/Button";
import { cardsAnnouncerPage } from "../../components/CardAuction/database";
import { v4 as uuid } from "uuid";
import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { ModalAddAnnouncement } from "../../components/ModalAddAnnouncement";
import { Card } from "../../components/Card";
import announcerImg from "../../assets/announcer_sl.png";
import { CardAuctionForAnnouncer } from "../../components/CardAuctionForAnnouncer";
import { ModalEditAnnouncement } from "../../components/ModalEditAnnouncement";
import { ModalAddAnnouncementSuccess } from "../../components/ModalAddAnnouncementSuccess";
import { ModalDeleteAnnouncement } from "../../components/ModalDeleteAnnouncement";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { IAnnouncement } from "../../interfaces/context";
import { ModalEditAddress } from "../../components/ModalEditAddress";
import { ModalProfileEditRemove } from "../../components/ModalEditProfile";
import { ModalRemoveUser } from "../../components/ModalRemoveUser";

export const AnnouncerPage = () => {
  const params = useParams();

  const {
    showAddAnnouncementModal,
    setShowAddAnnouncementModal,
    showModalAddAnnouncementSuccess,
    showEditAnnouncementModal,
    showModalDeleteAnnouncement,
    retrieveAnnouncer,
    announcer,
    isModalProfileOpen,
    setModalProfile,
    isModalAddressOpen,
    setModalAddress,
    setModalRemoveUser,
    isModalRemoveUserOpen,
  } = useContext(Context);

  const token = localStorage.getItem("@token");

  useEffect(() => {
    retrieveAnnouncer(params.id!);
  }, []);

  const { user } = useContext(AuthContext);

  return token && announcer.id == user?.id ? (
    <>
      <Header />
      {showAddAnnouncementModal && <ModalAddAnnouncement />}
      {showEditAnnouncementModal && <ModalEditAnnouncement />}
      {showModalAddAnnouncementSuccess && <ModalAddAnnouncementSuccess />}
      {showModalDeleteAnnouncement && <ModalDeleteAnnouncement />}
      {isModalProfileOpen && (
        <ModalProfileEditRemove
          setModalProfile={setModalProfile}
          setModalRemoveUser={setModalRemoveUser}
        />
      )}
      {isModalAddressOpen && (
        <ModalEditAddress setModalAddress={setModalAddress} />
      )}
      {isModalRemoveUserOpen && (
        <ModalRemoveUser setModalRemoveUser={setModalRemoveUser} />
      )}

      <AnnouncerPageStyle>
        <div className="container-page">
          <div className="background-announcer" />

          <div className="information-announcer">
            <NameIconAnnouncer>
              {announcer?.name
                ?.split(" ")
                .map((name, index) =>
                  index <= 1 ? name[0].toUpperCase() : undefined
                )}
            </NameIconAnnouncer>

            <div className="name-announcer">
              <p id="name">{announcer.name}</p>
              <div className="announcer-icon">
                <p id="announcer">Anunciante</p>
              </div>
            </div>

            <p id="description">{announcer.description}</p>

            {user?.id == announcer.id ? (
              <Button
                background="#FDFDFD"
                background_hover="#EDEAFD"
                border_color="#4529E6"
                color="#4529E6"
                children="Criar anúncio"
                width="160px"
                lower_width="160px"
                onClick={() => setShowAddAnnouncementModal(true)}
              />
            ) : (
              <br />
            )}
          </div>

          <div className="content-announcements">
            {user?.id == announcer.id ? (
              <>
                <h3 id="title-auction">Leilão</h3>

                <ul className="list-auction">
                  {cardsAnnouncerPage
                    .filter((result) => result.name == "Samuel Leão")
                    .map((item) => (
                      <CardAuctionForAnnouncer key={uuid()} item={item} />
                    ))}
                </ul>
              </>
            ) : (
              <br />
            )}

            <h3 id="title-cars">Carros</h3>

            <ul className="list-cars">
              {announcer?.announcements?.map(
                (item: IAnnouncement) =>
                  item.type_vehicle == "car" && (
                    <Card key={uuid()} item={item} />
                  )
              )}
            </ul>

            <h3 id="title-bikes">Motos</h3>

            <ul className="list-bikes">
              {announcer?.announcements?.map(
                (item: IAnnouncement) =>
                  item.type_vehicle == "motorcycle" && (
                    <Card key={uuid()} item={item} />
                  )
              )}
            </ul>
          </div>
        </div>
      </AnnouncerPageStyle>
      <Footer />
    </>
  ) : (
    <>
      <Header />
      <AnnouncerPageWithoutTokenStyle>
        <div className="container-page">
          <div className="background-announcer" />

          <div className="information-announcer">
            <NameIconAnnouncer>
              {announcer?.name
                ?.split(" ")
                .map((name, index) =>
                  index <= 1 ? name[0].toUpperCase() : undefined
                )}
            </NameIconAnnouncer>

            <div className="name-announcer">
              <p id="name">{announcer.name}</p>
              <div className="announcer-icon">
                <p id="announcer">Anunciante</p>
              </div>
            </div>

            <p id="description">{announcer.description}</p>

            <br />
          </div>

          <div className="content-announcements">
            <h3 id="title-cars">Carros</h3>

            <ul className="list-cars">
              {announcer?.announcements?.map(
                (item: IAnnouncement) =>
                  item.type_vehicle == "car" && (
                    <Card key={uuid()} item={item} />
                  )
              )}
            </ul>

            <h3 id="title-bikes">Motos</h3>

            <ul className="list-bikes">
              {announcer?.announcements?.map(
                (item: IAnnouncement) =>
                  item.type_vehicle == "motorcycle" && (
                    <Card key={uuid()} item={item} />
                  )
              )}
            </ul>
          </div>
        </div>
      </AnnouncerPageWithoutTokenStyle>
      <Footer />
    </>
  );
};
