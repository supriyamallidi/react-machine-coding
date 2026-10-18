import './App.css';
import Counter from './q01_counter/Counter';
import CheckBoxGroup from './q02_checkboxes/CheckBoxGroup';
import Todo from './q03_todo/Todo';
import Search from './q04_search/Search';
import NestedCircles from './q05_circles/NestedCircles';

function App() {
  return (
    <div className="App">
      <Counter/>
      <CheckBoxGroup/>
      <Todo/>
      <Search/>
      <NestedCircles/>
    </div>
  );
}

export default App;
