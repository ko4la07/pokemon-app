import React from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";

const ModalCard = ({data}) => {
  const [isOpenCard, openModalCard, closeModalCard] = useModal(false);
  return (
    <>
      <button onClick = {openModalCard}>Information</button>
      <Modal isOpen = {isOpenCard} closeModal = {closeModalCard}>
      <article key = {data.id}>
              <img src = {data.sprites.other['dream_world']['front_default']} alt = 'data'></img>
              <div> <strong>{data.name}</strong> {data.stats[0]['base_stat']} Hp </div>
              <div>
                <p>{data.weight}</p>
                <span>Peso</span>
              </div>
              <div>
                {
                  data.types.map((element, index) => {
                    return (
                      <span key = {index}>{element.type.name}</span>
                    )
                  })
                }
              </div>
            </article>
      </Modal>
    </>
  )
};

export default ModalCard;
