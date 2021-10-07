import { useDispatch } from 'react-redux';

import { pageActions } from '../../store/pageSlice';

import './BackgroundVideo.scss';

function BackgroundVideo(props) {
  const dispatch = useDispatch();

  function canPlayHandlerThrough() {
    dispatch(pageActions.doneLoading());
  }

  return <video onCanPlayThrough={canPlayHandlerThrough} autoPlay loop muted src={props.url} className="video"></video>;
}

export default BackgroundVideo;
