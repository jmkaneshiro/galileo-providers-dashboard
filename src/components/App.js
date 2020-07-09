import React from 'react';
import PracticeDashboard from './PracticeDashboard';
import { SelectedPractitionersProvider } from '../contexts/SelectedPractitionersContext';
function App() {
  return (
    <SelectedPractitionersProvider>
      <PracticeDashboard />
    </SelectedPractitionersProvider>
  );
}

export default App;
