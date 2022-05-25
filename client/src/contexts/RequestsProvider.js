import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const RequestsContext = React.createContext();

export function useRequests() {
    return useContext(RequestsContext);
}

export function RequestsProvider({ children }) {
    const [requests, setRequests] = useLocalStorage('requests', []);

    function createRequests( id, start, end, accepted) {
        setRequests( prevRequest => {
            if (prevRequest != null){
                return [ ...prevRequest, { id, start, end, accepted }];
            } else {
                return [{ id, start, end, accepted }];
            }
            
        });
    }

    

    return (
        <RequestsContext.Provider value={{ requests, createRequests }}>
            { children }
        </RequestsContext.Provider>
    );
}
