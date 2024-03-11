import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./components/TodoList";
import Header from "./components/Header";


export default function App() {

  return (
    <Provider store={store}>
      <main className="App">
        <Header />
        <TodoList />
      </main>
    </Provider >
  );
}
