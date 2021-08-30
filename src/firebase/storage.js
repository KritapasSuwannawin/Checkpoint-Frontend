import firebase from './app';

const storage = firebase.storage();

export const storageRef = storage.ref();
export default storage;
