import { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Model, Container } from "./styles";

interface IModalImageCar {
  modalImageCar: boolean;
  setModalImageCar: (prev: boolean) => void;
  image: string;
}

export const ModalImageCar = ({
  modalImageCar,
  setModalImageCar,
  image,
}: IModalImageCar) => {
  const modalRef = useRef<HTMLInputElement>(null);

  const handleModal = () => {
    setModalImageCar(!modalImageCar);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        modalImageCar &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setModalImageCar(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [modalImageCar]);

  return (
    <Model>
      <Container ref={modalRef}>
        <CgClose size={20} onClick={() => setModalImageCar(!modalImageCar)}>
          x
        </CgClose>
        <h6>Imagem do veículo</h6>
        <figure>
          <img src={image} alt="" />
        </figure>
      </Container>
    </Model>
  );
};
