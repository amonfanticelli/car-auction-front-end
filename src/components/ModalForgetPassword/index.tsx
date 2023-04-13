import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../service/api";
import { Button } from "../Button";
import { Input } from "../Input";
import { Model, Container } from "./styles";

interface IForgetPassordProps {
  setIsOpenModal: (prev: boolean) => void;
  isOpenModal: boolean;
}

export const ModalForgetPassword = ({
  setIsOpenModal,
  isOpenModal,
}: IForgetPassordProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLInputElement>(null);

  const requestForgetPassword = () => {
    const data = { email: inputRef.current?.value };

    api
      .post("/forget_password", data)
      .then((res) => {
        toast.success("Verifique sua caixa de mensagem");
      })
      .catch(() => {
        toast.error("E-mail não encontrado");
      });
  };

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isOpenModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsOpenModal(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpenModal]);

  return (
    <Model>
      <Container ref={modalRef}>
        <h6>Recuperação de senha</h6>
        <Input
          id="email"
          placeholder="Insira um e-mail válido"
          label="Email"
          type="text"
          ref={inputRef}
        />
        <div className="btns">
          <Button
            background="var(--colors-white)"
            color="var(--colors-grey-0)"
            children="Cancelar"
            background_hover=""
            color_hover=""
            border_color="var(--colors-grey-4)"
            border_hover="var(--colors-grey-0)"
            width="47%"
            height="40px"
            onClick={handleModal}
          />
          <Button
            background="var(--colors-brand-4)"
            color="var(--colors-brand-1)"
            children="Enviar"
            background_hover="var(--colors-brand-1)"
            color_hover="var(--colors-white)"
            border_color="var(--colors-brand-4)"
            border_hover="var(--colors-brand-1)"
            width="47%"
            height="40px"
            onClick={requestForgetPassword}
          />
        </div>
      </Container>
    </Model>
  );
};
