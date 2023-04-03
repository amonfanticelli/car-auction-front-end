import { Link } from "react-router-dom";
import { IAnnouncementResponse } from "../../interfaces/context";
import { Container, NameIcon, SpanInfo } from "./style";

export interface IProps {
  item: IAnnouncementResponse;
}

function generateColor() {
  const letters = "6789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}

export const CardHome = ({ item }: any) => {
  return (
    <Container>
      <Link to={`/announcement/${item.id}`}>
        <div className="container-image">
          <img src={item.image} alt="" />
        </div>

        <h5>{item.title}</h5>

        <p className="container-description text-body-2-400">
          {item.description}
        </p>

        <div className="container-name text-body-1-400">
          <NameIcon
            className="container-nameIcon-icon text-body-2-400"
            backgroundColor={generateColor()}
          >
            {item.user.name
              .split(" ")
              .map((name: any, index: number) =>
                index <= 1 ? name[0].toUpperCase() : undefined
              )}
          </NameIcon>
          {item.user.name}
        </div>

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
      </Link>
    </Container>
  );
};
