import { createStore, compose } from "redux";
import { reduxFirestore } from "redux-firestore";
import firestoreConf from "../secrets/firestoreSecret";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import rootReducer from "../reducers";

export default function configureStore(initialState, history) {
  const enhancers = [];

  firebase.initializeApp(firestoreConf);
  firebase.firestore().settings({ timestampsInSnapshots: true });
  //const firestore = firestoreConf;

  // Dev tools store enhancer
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }

  const createStoreWithMiddleware = compose(
    // Add redux firestore store enhancer
    reduxFirestore(firebase),
    ...enhancers
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer);

  return store;
}
