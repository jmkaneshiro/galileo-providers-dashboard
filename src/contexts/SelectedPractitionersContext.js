import React, {useState, createContext} from 'react';

export const SelectedPractitionersContext = createContext();

export const SelectedPractitionersProvider = props => {
  const [selectedPractitioners, setSelectedPractitioners] = useState([]);
  
  return (
    <SelectedPractitionersContext.Provider value={[selectedPractitioners, setSelectedPractitioners]}>
      {props.children}
    </SelectedPractitionersContext.Provider>
  );
};