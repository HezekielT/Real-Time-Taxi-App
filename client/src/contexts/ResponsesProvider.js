import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRequests } from '../contexts/RequestsProvider'
import { useSocket } from './SocketProvider';
const ResponseContext = React.createContext();

export function useResponses() {
    return useContext(ResponseContext);
}

export function ResponsesProvider({ children }) {
    const [responses, setResponses] = useLocalStorage('responses', []);

    function createResponses( passengersId, id, driversPhoto, driversName, carsPlateNo, completed ) {
        setResponses( prevResponse => {
            if (prevResponse != null){
                return [ ...prevResponse, { passengersId, id, driversPhoto, driversName, carsPlateNo, completed }];
            } else {
                return [{ passengersId, id, driversPhoto, driversName, carsPlateNo, completed }];
            }
            
        });
        //sendResponses(passengerId, id, driversPhoto, driversName, carsPlateNo)
        // after setting responses, start a conversation between the driver and the passenger
        // 
    }
    
    function communication() {
        //socket.emit('request-accepted', (passengerId, id, start, end, accepted))
        
    }
    function sendResponses(passengerId, id, driversPhoto, driversName, carsPlateNo) {
        //socket.emit(passengerId, id, driversPhoto, driversName, carsPlateNo)
    }

    return (
        <ResponseContext.Provider value={{ responses, createResponses }}>
            { children}
        </ResponseContext.Provider>
    );
}
