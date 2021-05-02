import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Chat from './screens/Chat'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => <Chat {...props}/>} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
