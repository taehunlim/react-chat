import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Chat from './screens/Chat';
import ChatRoom from './screens/ChatRoom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => <Chat {...props}/>} />
        <Route exact path="/:roomId" component={ChatRoom} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
