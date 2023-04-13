import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from "../../Button";
import { IconUser, NavLink } from "./style";
import { MenuDropDown, StyledBurger } from "./style";
import { Context } from "../../../context/Context";

interface IMenuBurgerProps {
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
  handleToggle: () => void;
  refMenu: React.RefObject<HTMLDivElement> | null;
  quitAccount: () => void;
}

const Burger = ({
  isOpen,
  setIsOpen,
  handleToggle,
  refMenu,
  quitAccount,
}: IMenuBurgerProps) => {
  const { user, setUser } = useContext(AuthContext);
  const { isModalAddressOpen, setModalAddress } = useContext(Context);
  const { isModalProfileOpen, setModalProfile } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <StyledBurger open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      {isOpen && (
        <MenuDropDown open={isOpen} ref={refMenu}>
          <NavLink className="text-body-1-600" to="/" onClick={handleToggle}>
            Carros
          </NavLink>
          <NavLink className="text-body-1-600" to="/" onClick={handleToggle}>
            Motos
          </NavLink>
          <NavLink className="text-body-1-600" to="/" onClick={handleToggle}>
            Leilão
          </NavLink>
          <hr />
          {user ? (
            <>
              <NavLink
                onClick={() => setModalProfile(!isModalProfileOpen)}
                className="text-body-1-600"
                to=""
              >
                Editar Perfil
              </NavLink>
              <IconUser>
                <p className="text-body-2-400">
                  {user.name.split(" ").map((name) => name[0].toUpperCase())}
                </p>
              </IconUser>
              <NavLink
                onClick={() => setModalAddress(!isModalAddressOpen)}
                className="text-body-1-600"
                to=""
              >
                Editar Endereço
              </NavLink>
              <NavLink className="text-body-1-600" to="">
                Minhas Compras
              </NavLink>
              <NavLink className="text-body-1-600" to="" onClick={quitAccount}>
                Sair
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="text-body-1-600" to="/login">
                Fazer Login
              </NavLink>
              <Button
                onClick={() => navigate("/register", { replace: true })}
                background={"var(--colors-grey-10)"}
                color={"var(--colors-grey-0)"}
                border_color={"var(--colors-grey-4)"}
                children={"Cadastrar"}
                background_hover={"var(--colors-grey-1)"}
                color_hover={"var(--colors-grey-10)"}
              ></Button>
            </>
          )}
        </MenuDropDown>
      )}
    </>
  );
};

export default Burger;
