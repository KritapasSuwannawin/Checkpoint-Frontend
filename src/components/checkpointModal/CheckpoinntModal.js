import './CheckpointModal.scss';

function CheckpointModal(props) {
  return (
    <div className="checkpoint-modal">
      <div className="checkpoint-modal__container">
        <p className="checkpoint-modal__title">{props.title}</p>
        <div className="checkpoint-modal__btn" onClick={props.closeHandler}>
          {props.btn}
        </div>
      </div>
    </div>
  );
}

export default CheckpointModal;
