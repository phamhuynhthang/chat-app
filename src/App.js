import Login from "./Components/Login";
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import ChatRoom from "./Components/ChatRoom";
import AuthProvider from "./Components/Context/AuthProvider";
import AppProvider from "./Components/Context/AppProvider";
import AddRoomModal from "./Components/Modals/AddRoomModal";
import InviteMemberModal from "./Components/Modals/InviteMemberModals";
function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path='/login' />
            <Route component={ChatRoom} path='/' />
          </Switch>
          <AddRoomModal/>
          <InviteMemberModal/>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
