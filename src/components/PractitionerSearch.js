import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { SelectedPractitionersContext } from '../contexts/SelectedPractitionersContext';

const PractitionerSearch = () => {
  //Modal state and functions
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  //Get a list of the all available providers
  const [practitioners, setPractitioners] = useState([]);
  useEffect(() => {
    getPractitioners();
  }, []);
  const getPractitioners = (async () => {
    const practitioners = await axios.get(
      'https://testapi.io/api/akirayoglu/0/reference/getDoctors'
    );
    const practitionerOptions = await practitioners.data.map(practitioner =>
        ({
          key: practitioner.doctor_id,
          text: `${practitioner.first_name} ${practitioner.last_name}`,
          value: practitioner
        })
    );

    setPractitioners(practitionerOptions);
  });

  const [selectedPractitioners, setSelectedPractitioners] = useContext(SelectedPractitionersContext);
  const [practitionerToAdd, setPractitionerToAdd] = useState({});

  const handleDropdownChange = (event, data) => {
    setPractitionerToAdd(data.value);
  };

  const handleProviderAdded = (async () => {
    debugger
    if (Object.keys(practitionerToAdd).length === 0) {
      closeModal();
    } else {
      await setPractitioners(practitioners.filter(practitioner => practitioner.value !== practitionerToAdd));
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
          options={practitioners}
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