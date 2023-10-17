import { createContext, useState, useMemo } from "react";

export const RequestContext = createContext({
  request: { loading: false },
  setRequest: (data: any) => {}
});

const initialState = {
  loading: false
};

export const RequestProvider = ({children}:any) => {
  const [request, setRequest] = useState(initialState);

  const value = useMemo(
    () => ({request, setRequest}),
    [request, setRequest]
  );

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  );
};