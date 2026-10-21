import './App.css';
import Counter from './q01_counter/Counter';
import CheckBoxGroup from './q02_checkboxes/CheckBoxGroup';
import Todo from './q03_todo/Todo';
import Search from './q04_search/Search';
import NestedCircles from './q05_circles/NestedCircles';
import InfiniteScroll from './q06_infinitescroll/InfiniteScroll';
import MultiStepForm from './q07_multistepform/MultiStepForm';
import StarRating from './q08_starrating/StarRating';
import Accordion from './q09_accordion/Accordion';
import Dialog from './q10_modal/Dialog';
import Dropdown from './q11_dropdown/Dropdown';
import TicTacToe from './q12_tictactoe/TicTacToe';
import Pagination from './q13_pagination/Pagination';
import UserTable from './q13_pagination/UserTable';
import ShoppingCart from './q14_shoppingCart/ShoppingCart';

function App() {
  return (
    <div className="App">
      {/* <Counter/>
      <CheckBoxGroup/>
      <Todo/>
      <Search/>
      <NestedCircles/> 
      <InfiniteScroll/>
      <MultiStepForm/>
      <StarRating/>
      <Accordion/>
      <Dialog/>
      <Dropdown/>
      <TicTacToe/>
      <UserTable/>*/}
      <ShoppingCart/>
    </div>
  );
}

export default App;
