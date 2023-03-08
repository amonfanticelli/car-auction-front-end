import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import {
  MainContent,
  Body,
  Aside,
  BoxImgCarInfoDescription,
  CarSection,
  Comments,
  CommentSection,
  CommentsBox,
  BoxComment,
  CommentsFixed,
  CommentSectionOffline,
} from "./style";
import { CardComments } from "../../components/CardComments";
import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../service/api";
import { IComment } from "../../interfaces/components";
import { IAnnouncementResponse } from "../../interfaces/context";
import { Button } from "../../components/Button";
import { toast } from "react-hot-toast";
import { ModalImageCar } from "../../components/ModalImageCar";
import { Context } from "../../context/Context";
import { ModalEditAddress } from "../../components/ModalEditAddress";
import { ModalProfileEditRemove } from "../../components/ModalEditProfile";
import { ModalRemoveUser } from "../../components/ModalRemoveUser";

export const Annoucement = () => {
  const [modalImageCar, setModalImageCar] = useState(false);
  const [imageRender, setImageRender] = useState("");

  const textAreaRef = useRef<any>(null);
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<IComment[]>([]);
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<IAnnouncementResponse>(
    {} as IAnnouncementResponse
  );

  const params = useParams();

  useEffect(() => {
    const getAnnouncementsAndComments = async () => {
      const comments = await api.get(`/comments/${params.id}`);
      setComments(comments.data);

      const announcement = await api.get(`/announcements`);
      const announcementOpen = announcement.data.filter(
        (announc: IAnnouncementResponse) => announc.id == params.id
      );
      setAnnouncement(announcementOpen[0]);
    };
    getAnnouncementsAndComments().catch((err) => alert(err));
  }, []);

  const modalAndImageRender = (image: string) => {
    setModalImageCar(!modalImageCar);
    setImageRender(image);
  };

  const createComment = async () => {
    try {
      const token = localStorage.getItem("@token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const data = { description: textAreaRef.current.value };

      await api.post(`/comments/${params.id}`, data);

      const comments = await api.get(`/comments/${params.id}`);
      setComments(comments.data);
    } catch {
      toast.error("Não foi possível fazer o comentário");
    }
  };

  const {
    isModalProfileOpen,
    setModalProfile,
    isModalAddressOpen,
    setModalAddress,
    setModalRemoveUser,
    isModalRemoveUserOpen,
  } = useContext(Context);

  return (
    <>
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
      <Header />
      <Body>
        <MainContent>
          <BoxImgCarInfoDescription>
            <figure>
              <img src={announcement.image} alt="Foto Principal" />
            </figure>
            <CarSection>
              <h6>{announcement.title}</h6>
              <div className="carInfoBox">
                <div className="yearAndKmBox">
                  <span className="yearKm">{announcement.year}</span>
                  <span className="yearKm">{announcement.km} km</span>
                </div>

                <p className="price">R$ {announcement.price}</p>
              </div>

              <Button
                color="var(--colors-white)"
                border_color="var(--colors-brand-1)"
                children="Comprar"
                background_hover="var(--colors-brand-2)"
                color_hover="var(--colors-white)"
                border_hover="var(--colors-brand-1)"
                width="100px"
                height="38px"
                background="var(--colors-brand-1)"
              />
            </CarSection>
            <section className="description">
              <h6>Descrição</h6>
              <p>{announcement.description}</p>
            </section>
          </BoxImgCarInfoDescription>

          <Aside>
            <section className="photoSection">
              <h6>Fotos</h6>
              {announcement?.gallery?.length > 0 ? (
                <ul className="photoList">
                  {announcement.gallery.map((item, index) => {
                    return (
                      <>
                        <li
                          key={index}
                          className="photoElement"
                          onClick={() => modalAndImageRender(item.image)}
                        >
                          <img
                            className="asideImg"
                            src={item.image}
                            alt="Fotos Galeria"
                          />
                        </li>
                      </>
                    );
                  })}
                </ul>
              ) : (
                <img src="https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto-300x300.jpg" />
              )}

              {modalImageCar && (
                <ModalImageCar
                  image={imageRender}
                  setModalImageCar={setModalImageCar}
                  modalImageCar={modalImageCar}
                />
              )}
            </section>
            <section className="userSection">
              <div className="userTag">
                {announcement.user?.name
                  .split(" ")
                  .map((name, index) =>
                    index <= 1 ? name[0].toUpperCase() : undefined
                  )}
              </div>
              <span className="userName">{announcement.user?.name}</span>
              <p className="userDescription">
                {announcement.user?.description}
              </p>
              <button
                className="userAds"
                onClick={() => navigate(`/announcer/${announcement.user.id}`)}
              >
                Ver todos anuncios
              </button>
            </section>
          </Aside>
        </MainContent>

        <CommentsBox>
          <Comments>
            <h6>Comentários</h6>

            <ul className="commentList">
              {comments &&
                comments.map((comment, index) => (
                  <CardComments
                    key={index}
                    description={comment.description}
                    createdAt={comment.createdAt}
                    user={comment.user}
                  />
                ))}
            </ul>
          </Comments>

          {user ? (
            <CommentSection>
              <div className="userInfoComment">
                <span className="userBallComment">
                  {user.name
                    .split(" ")
                    .map((name, index) =>
                      index <= 1 ? name[0].toUpperCase() : undefined
                    )}
                </span>{" "}
                <p className="nameComment">{user.name}</p>{" "}
              </div>

              <textarea
                ref={textAreaRef}
                placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
              ></textarea>
              <button onClick={() => createComment()}>Comentar</button>
              <div className="comments-fixed">
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current.value = "Gostei muito!";
                  }}
                >
                  Gostei muito!
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current.value = "Incrível";
                  }}
                >
                  Incrível
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current.value =
                      "Recomendarei para meus amigos!";
                  }}
                >
                  Recomendarei para meus amigos!
                </CommentsFixed>
              </div>
            </CommentSection>
          ) : (
            <CommentSectionOffline>
              <textarea
                ref={textAreaRef}
                placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
              ></textarea>
              <button onClick={() => navigate("/login", { replace: true })}>
                Comentar
              </button>
              <div className="comments-fixed">
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current.value = "Gostei muito!";
                  }}
                >
                  Gostei muito!
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current.value = "Incrível";
                  }}
                >
                  Incrível
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current.value =
                      "Recomendarei para meus amigos!";
                  }}
                >
                  Recomendarei para meus amigos!
                </CommentsFixed>
              </div>
            </CommentSectionOffline>
          )}
        </CommentsBox>
      </Body>
      <Footer />
    </>
  );
};
