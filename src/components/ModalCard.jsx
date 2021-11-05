import React from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";

const ModalCard = ({data}) => {
  const [isOpenCard, openModalCard, closeModalCard] = useModal(false);
  return (
    <>
      <button onClick = {openModalCard} className = 'btn-card'>Information</button>
      <Modal isOpen = {isOpenCard} closeModal = {closeModalCard}>
      <article key = {data.id} className = 'modal-article'>
        <div className = 'img-pokemon'>
          <img src = {data.sprites.other['dream_world']['front_default']} alt = 'data' className = 'modal-img'></img>
        </div>
        <div className = 'modal-information'>
        <div className = 'pokemon-name'> <strong>{data.name}</strong> <span>{data.stats[0]['base_stat']} Hp</span> </div>
        <div className = 'pokemon-info'>
          <div className = 'pokemon-wh'>
            <p>{data.weight} Kg</p>
            <span>Weight</span>
          </div>
          <div id= 'type-pokemon'>
            {
              data.types.map((element, index) => {
                return (
                  <div key = {index} className = 'each-type'>
                    <img src = {require(`../assets/img/${element.type.name}.png`).default}  alt = 'type' style = {{width:'26px', height:'26px'}} />
                    <span>{element.type.name}</span>
                  </div>
                )
              })
            }
          </div>
          <div className = 'pokemon-wh'>
            <p>{data.height} m</p>
            <span>Height</span>
          </div>
        </div>
        <div className = 'line-modal'></div>
        <table>
          <tbody>
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
          </tbody>
        </table>
        </div>
      </article>
      </Modal>
    </>
  )
};

export default ModalCard;
