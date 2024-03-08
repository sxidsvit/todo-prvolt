import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'


import storeWithPersistor from "./storage/store.js";
import TodoList from "./components/TodoList";


export default function App() {
  const { persistor, store } = storeWithPersistor()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App pt-[120px]">
          <TodoList />
        </div>
      </PersistGate>
    </Provider>
  );
}
