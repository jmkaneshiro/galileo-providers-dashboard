import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import { SelectedPractitionersContext } from '../contexts/SelectedPractitionersContext';
import { AvailPractitionersContext } from '../contexts/AvailPractitionersContext';

const Practitioner = ({practitioner}) => {
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  const getTasks = (async () => {
    const allTasks = await axios.get(
      'https://testapi.io/api/akirayoglu/0/tasks/getTasks'
    );
    setAllTasks(allTasks.data);
  });
  const thisUsersTasks = allTasks.filter(task => task.owner === practitioner.doctor_id);

  const [availPractitioners, setAvailPractitioners] = useContext(AvailPractitionersContext);
  const [selectedPractitioners, setSelectedPractitioners] = useContext(SelectedPractitionersContext);

  //When a practitioner is added to the selected context, they are removed from the available one
  const handleCloseCard = () => {
    setAvailPractitioners([...availPractitioners, practitioner]);
    setSelectedPractitioners(selectedPractitioners.filter(
      removedPractitioner => removedPractitioner.doctor_id !== practitioner.doctor_id
    ));
  };

  const style = {
    closeCard: {
      cursor: 'pointer',
      float: 'right'
    }
  };

  return (
    <Card as='article' key={practitioner.doctor_id} practitioner={practitioner}>
      <Card.Content>
        <i className="close icon" style={style.closeCard} onClick={handleCloseCard}></i>
        <Card.Header>{`${practitioner.first_name} ${practitioner.last_name}`}</Card.Header>
        <Card.Meta>{`${practitioner.first_name}'s tasks`}</Card.Meta>
        {thisUsersTasks.map(task => {
          return (
            <Card key={task.task_id}>
              <Card.Header textAlign="center">{task.task_id}</Card.Header>
              <Card.Content>
                <div>{`Priority: ${task.priority}`}</div>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Content>
    </Card>
  )
}

export default Practitioner;

