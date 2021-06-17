import {BrowserRouter,Switch,Route} from "react-router-dom"
import Lobby from './Lobby';
function App() {
  return (
    <>
    <div class="header">Chess    </div>
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
      <div class="footer">Made by: <a href="https://github.com/victorw1234"> github </a></div>
    </>
  );
}

export default App;
