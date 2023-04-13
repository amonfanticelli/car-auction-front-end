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
  CommentsFixed,
  CommentSectionOffline,
} from "./style";
import { CardComments } from "../../components/CardComments";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { toast } from "react-hot-toast";
import { ModalImageCar } from "../../components/ModalImageCar";

import { Context } from "../../context/Context";
import { ModalEditAddress } from "../../components/ModalEditAddress";
import { ModalProfileEditRemove } from "../../components/ModalEditProfile";
import { ModalRemoveUser } from "../../components/ModalRemoveUser";

export const Annoucement = () => {
  const {
    announcementDetail,
    retrieveAnnouncement,
    createComment,
    isModalProfileOpen,
    setModalProfile,
    isModalAddressOpen,
    setModalAddress,
    setModalRemoveUser,
    isModalRemoveUserOpen,
  } = useContext(Context);

  const [modalImageCar, setModalImageCar] = useState(false);
  const [imageRender, setImageRender] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => retrieveAnnouncement(params.id!), []);

  const modalAndImageRender = (image: string) => {
    setModalImageCar(!modalImageCar);
    setImageRender(image);
  };

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
              <img src={announcementDetail.image} alt="Foto Principal" />
            </figure>
            <CarSection>
              <h6>{announcementDetail.title}</h6>
              <div className="carInfoBox">
                <div className="yearAndKmBox">
                  <span className="yearKm">{announcementDetail.year}</span>
                  <span className="yearKm">{announcementDetail.km} km</span>
                </div>

                <p className="price">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(announcementDetail.price)}
                </p>
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
              <p>{announcementDetail.description}</p>
            </section>
          </BoxImgCarInfoDescription>

          <Aside>
            <section className="photoSection">
              <h6>Fotos</h6>

              <ul className="photoList">
                {announcementDetail.gallery?.map((item, index) => {
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
                {announcementDetail.user?.name
                  .split(" ")
                  .map((name, index) =>
                    index <= 1 ? name[0].toUpperCase() : undefined
                  )}
              </div>
              <span className="userName">{announcementDetail.user?.name}</span>
              <p className="userDescription">
                {announcementDetail.user?.description}
              </p>
              <button
                className="userAds"
                onClick={() =>
                  navigate(`/announcer/${announcementDetail.user.id}`)
                }
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
              {announcementDetail?.comments?.map((comment, index) => (
                <CardComments
                  key={index}
                  id={comment.id}
                  description={comment.description}
                  createdAt={comment.createdAt}
                  user={comment.user}
                  paramsId={params.id!}
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
              <button
                onClick={() => {
                  if (textAreaRef.current!.value == "") {
                    toast.error("Digite um comentário!");
                  } else {
                    createComment(textAreaRef.current!.value, params.id!);
                  }
                }}
              >
                Comentar
              </button>
              <div className="comments-fixed">
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current!.value = "Gostei muito!";
                  }}
                >
                  Gostei muito!
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current!.value = "Incrível";
                  }}
                >
                  Incrível
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current!.value =
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
                    textAreaRef.current!.value = "Gostei muito!";
                  }}
                >
                  Gostei muito!
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current!.value = "Incrível";
                  }}
                >
                  Incrível
                </CommentsFixed>
                <CommentsFixed
                  onClick={() => {
                    textAreaRef.current!.value =
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
