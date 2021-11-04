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
                <p>{data.weight} Kg</p>
                <span>Weight</span>
              </div>
              <div>
                {
                  data.types.map((element, index) => {
                    return (
                      <div key = {index}>
                        <img src = {require(`../assets/img/${element.type.name}.png`).default}  alt = 'type' style = {{width:'26px', height:'26px'}} />
                        <span>{element.type.name}</span>
                      </div>
                    )
                  })
                }
              </div>
              <div>
                <p>{data.height} m</p>
                <span>Height</span>
              </div>
              <table>
                {
                  data.stats.map((element, index) => {
                    return (
                      <tr key = {index}>
                        <td>{element.stat.name}:</td>
                        <td>{element['base_stat']}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </article>
      </Modal>
    </>
  )
};

export default ModalCard;
