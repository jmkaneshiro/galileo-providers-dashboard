import React from 'react';
import PracticeDashboard from './PracticeDashboard';
import { SelectedPractitionersProvider } from '../contexts/SelectedPractitionersContext';
import { AvailPractitionersProvider } from '../contexts/AvailPractitionersContext';
function App() {
  return (
    <AvailPractitionersProvider>
      <SelectedPractitionersProvider>
        <PracticeDashboard />
      </SelectedPractitionersProvider>
    </AvailPractitionersProvider>
  );
}

export default App;
