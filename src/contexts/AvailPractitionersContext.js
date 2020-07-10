import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AvailPractitionersContext = createContext();

export const AvailPractitionersProvider = props => {
  const [availPractitioners, setAvailPractitioners] = useState([]);

  useEffect(() => {
    getPractitioners();
  }, []);
  const getPractitioners = (async () => {
    const practitioners = await axios.get(
      'https://testapi.io/api/akirayoglu/0/reference/getDoctors'
    );
    setAvailPractitioners(practitioners.data);
  });

  return (
    <AvailPractitionersContext.Provider value={[availPractitioners, setAvailPractitioners]}>
      {props.children}
    </AvailPractitionersContext.Provider>
  );
};