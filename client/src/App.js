import React from "react";
import { Outlet } from 'react-router-dom';
import Navigator from "./components/Navigator";
import { RequestsProvider } from './contexts/RequestsProvider'
import { ResponsesProvider } from "./contexts/ResponsesProvider";
import { SocketProvider } from "./contexts/SocketProvider";
const App = () => {
  
  return (
    <SocketProvider>
      <ResponsesProvider>
        <RequestsProvider>
            <Navigator />
            <Outlet />
        </RequestsProvider>
      </ResponsesProvider>
    </SocketProvider>
    //<SignIn />
       
  );
}

export default App;
