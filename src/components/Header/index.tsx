import {
  Container,
  HeaderStyle,
  LinkDropDownUser,
  MenuDropDown,
  MenuNav,
  NavLink,
  NavUser,
} from "./style";
import { Button } from "../Button";
import Burger from "./MenuHamburger";
import { createRef, useContext, useEffect, useState } from "react";
import logo from "../../assets/logo_header.png";
import { AuthContext } from "../../context/AuthContext";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const Header = () => {
  const inputRef = createRef<HTMLDivElement>();

  const { user, setUser } = useContext(AuthContext);
  const { isModalProfileOpen, setModalProfile } = useContext(Context);
  const { isModalAddressOpen, setModalAddress } = useContext(Context);
  const navigate = useNavigate();

  const [isOpenMenuUser, setIsOpenMenuUser] = useState(false);
  const [isOpenHamburgerMenu, setIsOpenHamburgerMenu] = useState(false);
  const [width, setWidth] = useState<number>(0);

  function handleToggleMenuUser() {
    setIsOpenMenuUser((prev) => !prev);
  }

  function openModal() {
    setModalProfile(!isModalProfileOpen);
  }

  function openAddressModal() {
    setModalAddress(!isModalAddressOpen);
  }

  function handleBothClicksAddress() {
    handleToggleMenuUser();
    openAddressModal();
  }
  function handleBothClicks() {
    handleToggleMenuUser();
    openModal();
  }

  function quitAccount() {
    setIsOpenMenuUser((prev) => !prev);
    toast("Logout realizado com sucesso", { icon: "⚠️" });
    localStorage.removeItem("@token");
    localStorage.removeItem("@user");
    setUser(null);
    navigate("/", { replace: true });
  }

  function handleToggleHamburgerMenu() {
    setIsOpenHamburgerMenu((prev) => !prev);
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isOpenMenuUser &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpenMenuUser(false);
      }
      if (
        isOpenHamburgerMenu &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpenHamburgerMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpenMenuUser, isOpenHamburgerMenu]);

  useEffect(() => {
    const captureWidth = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      if (newWidth > 767) return setIsOpenHamburgerMenu(false);
      if (newWidth < 768) return setIsOpenMenuUser(false);
    };

    window.addEventListener("resize", captureWidth);
    return () => window.removeEventListener("resize", captureWidth);
  }, []);

  return (
    <HeaderStyle>
      <Container>
        <Link to={"/"}>
          <img src={logo} alt="Motors shop" />
        </Link>

        <Burger
          isOpen={isOpenHamburgerMenu}
          setIsOpen={setIsOpenHamburgerMenu}
          handleToggle={handleToggleHamburgerMenu}
          refMenu={inputRef}
          quitAccount={quitAccount}
        />

        <MenuNav>
          <NavLink className="text-body-1-600" to="/">
            Carros
          </NavLink>
          <NavLink className="text-body-1-600" to="/">
            Motos
          </NavLink>
          <NavLink className="text-body-1-600" to="/">
            Leilão
          </NavLink>
          <div className="vertical-line" />

          {user ? (
            <NavUser onClick={handleToggleMenuUser}>
              <p className="text-button-big-text">
                {user.name
                  .split(" ")
                  .map((name, index) =>
                    index <= 1 ? name[0].toUpperCase() : undefined
                  )}
              </p>
              <h4 className="text-body-1-400">{user.name}</h4>
            </NavUser>
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

          {isOpenMenuUser && (
            <MenuDropDown
              ref={inputRef}
              open={isOpenMenuUser}
              height={user?.is_announcer == true ? "12.5rem" : "9.5rem"}
            >
              <LinkDropDownUser
                className="text-body-1-400"
                to=""
                onClick={handleBothClicks}
              >
                Editar Perfil
              </LinkDropDownUser>
              <LinkDropDownUser
                className="text-body-1-400"
                to=""
                onClick={handleBothClicksAddress}
              >
                Editar Endereço
              </LinkDropDownUser>
              {user?.is_announcer == true && (
                <LinkDropDownUser
                  className="text-body-1-400"
                  to={`/announcer/${user?.id}`}
                  onClick={handleToggleMenuUser}
                >
                  Meus anúncios
                </LinkDropDownUser>
              )}
              <LinkDropDownUser
                className="text-body-1-400"
                to=""
                onClick={quitAccount}
              >
                Sair
              </LinkDropDownUser>
            </MenuDropDown>
          )}
        </MenuNav>
      </Container>
    </HeaderStyle>
  );
};
