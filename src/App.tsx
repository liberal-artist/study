import './App.css';
import * as D from "./util/data";

function App() {
  return (
    <div>
      <p>
        {D.randomName()}, {D.randomJobTitle()}, {D.randomDayMonthYear()}
      </p>
      <img src={D.randomAvatar()} height={`50`}></img>
      <img src={D.randomImage()} height={`300`}></img>
    </div>
  );
}

export default App;
