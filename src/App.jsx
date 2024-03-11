import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./components/TodoList";


export default function App() {

  return (
    <Provider store={store}>
      <div className="App pt-[120px]">
        <TodoList />
      </div>
    </Provider>
  );
}
