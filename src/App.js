import ChessBoard from './ChessBoard'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Lobby from './Lobby';
function App() {
  return (
    <div className="App">
      {/*only using react router for parameter
         in url*/}
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Lobby}/>
          <Route path="/:id" exact component={Lobby}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
