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
  const [practitionersToAdd, setPractitionersToAdd] = useState([]);

  const handleDropdownChange = (event, data) => {
    setPractitionersToAdd(data.value);
  };

  //When a practitioner is added to the selected context, they are removed from the available one
  const handlePractitionersAdded = (async () => {
    const toAdd = availPractitioners.filter(practitioner => practitionersToAdd.includes(practitioner.doctor_id));
    if (Object.keys(toAdd).length === 0) {
      closeModal();
    } else {
      await setAvailPractitioners(availPractitioners.filter(availPractitioner => !toAdd.includes(availPractitioner)));
      await setSelectedPractitioners([...selectedPractitioners, ...toAdd]);
      await setPractitionersToAdd([]);
      closeModal();
    }
  });

  return (
    <Modal
      trigger={<Button onClick={openModal}>Add Providers</Button>}
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
          multiple
          selection 
          options={practitionerOptions}
          onChange={handleDropdownChange}
          clearable
        />
        
      </Modal.Content>
      <Modal.Actions>
        <Button key='cancel' onClick={closeModal}>Cancel</Button>
        <Button key='submit' positive={true} onClick={handlePractitionersAdded }>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default PractitionerSearch;