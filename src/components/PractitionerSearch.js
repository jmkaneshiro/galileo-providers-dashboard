import React, { useState, useContext } from 'react';
import { Button, Modal, Dropdown } from 'semantic-ui-react';
import { SelectedPractitionersContext } from '../contexts/SelectedPractitionersContext';
import { AvailPractitionersContext } from '../contexts/AvailPractitionersContext';

const PractitionerSearch = () => {
  //Modal state and functions
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [availPractitioners, setAvailPractitioners] = useContext(AvailPractitionersContext);
  const practitionerOptions = availPractitioners.map(practitioner =>
    ({
      key: practitioner.doctor_id,
      text: `${practitioner.first_name} ${practitioner.last_name}`,
      value: practitioner.doctor_id
    })
  );

  const [selectedPractitioners, setSelectedPractitioners] = useContext(SelectedPractitionersContext);
  const [practitionerToAdd, setPractitionerToAdd] = useState({});

  const handleDropdownChange = (event, data) => {
    setPractitionerToAdd(availPractitioners.filter(practitioner => practitioner.doctor_id === data.value)[0]);
  };

  //When a practitioner is added to the selected context, they are removed from the available one
  const handleProviderAdded = (async () => {
    if (Object.keys(practitionerToAdd).length === 0) {
      closeModal();
    } else {
      await setAvailPractitioners(availPractitioners.filter(availPractitioner => availPractitioner !== practitionerToAdd));
      await setSelectedPractitioners([...selectedPractitioners, practitionerToAdd]);
      await setPractitionerToAdd({});
      closeModal();
    }
  });

  return (
    <Modal
      trigger={<Button onClick={openModal}>Add Provider</Button>}
      size='tiny'
      open={modalIsOpen}
    >
      <Modal.Header>
        <h1>Add a provider to the dashboard</h1>
      </Modal.Header>
      <Modal.Content>
        <Dropdown 
          placeholder="select a provider"
          fluid
          search
          selection 
          options={practitionerOptions}
          onChange={handleDropdownChange}
          clearable
        />
        
      </Modal.Content>
      <Modal.Actions>
        <Button key='cancel' onClick={closeModal}>Cancel</Button>
        <Button key='submit' positive={true} onClick={ handleProviderAdded }>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default PractitionerSearch;