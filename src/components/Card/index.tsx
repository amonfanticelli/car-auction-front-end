import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import { Button } from "../Button";
import { ButtonsForAnnouncer, Container, NameIcon, SpanInfo } from "./style";
import { IAnnouncement } from "../../interfaces/context";
export interface ICard {
  image: string;
  title: string;
  description: string;
  name: string;
  km: number;
  year: string;
  price: string;
}

function generateColor() {
  const letters = "6789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}

export const Card = ({ item }: any) => {
  const { setAnnouncementId, setShowEditAnnouncementModal, announcer } =
    useContext(Context);

  console.log(announcer);

  const userLogged = JSON.parse(localStorage.getItem("@user")!);

  const params = useParams();

  const navigate = useNavigate();

  return (
    <Container
      background={item.is_active == true ? "#4529E6" : "#ADB5BD"}
      width={item.is_active == true ? "51px" : "61px"}
    >
      <div className="container-image">
        <div className="is_active">
          <p className={item.is_active == true ? "active" : "inactive"}>
            {item.is_active == true ? "Ativo" : "Inativo"}
          </p>
        </div>
        <img className="container-image-img" src={item.image} alt="" />
      </div>

      <h5>{item.title}</h5>

      <p className="text-body-2-400">{item.description}</p>

      {userLogged?.id != params.id ? (
        <div className="container-name text-body-1-400">
          <NameIcon
            className="container-nameIcon-icon text-body-2-400"
            backgroundColor={generateColor()}
          >
            {announcer?.name
              ?.split(" ")
              .map((name: string, index: number) =>
                index <= 1 ? name[0].toUpperCase() : undefined
              )}
          </NameIcon>
          {announcer.name}
        </div>
      ) : (
        <br />
      )}

      <div className="container-infos">
        <SpanInfo>
          <span className="text-body-2-500">{item.km} km</span>
          <span className="text-body-2-500">{item.year}</span>
        </SpanInfo>
        <p className="text-body-1-400">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.price)}
        </p>
      </div>

      {userLogged?.id == params.id && (
        <ButtonsForAnnouncer>
          <Button
            id={item.id}
            width="80px"
            height="38px"
            color="#212529"
            border_color="#212529"
            border_hover="#5126EA"
            background_hover="#5126EA"
            background="#FFFFF"
            children="Editar"
            onClick={(event: any) => {
              setAnnouncementId(event.currentTarget.id);
              setShowEditAnnouncementModal(true);
            }}
          />
          <Button
            width="105px"
            height="38px"
            color="#212529"
            border_color="#212529"
            border_hover="#5126EA"
            background_hover="#5126EA"
            background="#FFFFF"
            children="Ver como"
            onClick={() => navigate(`/announcement/${item.id}`)}
          />
        </ButtonsForAnnouncer>
      )}
    </Container>
  );
};
