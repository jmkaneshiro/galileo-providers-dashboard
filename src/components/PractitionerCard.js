import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, Segment, Header } from 'semantic-ui-react';
import { SelectedPractitionersContext } from '../contexts/SelectedPractitionersContext';
import { AvailPractitionersContext } from '../contexts/AvailPractitionersContext';

const Practitioner = ({practitioner}) => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  const getTasks = (async () => {
    const assignedTasks = await axios.get(
      `https://testapi.io/api/akirayoglu/0/tasks/${practitioner.doctor_id}`
    );
    setAssignedTasks(assignedTasks.data);
  });

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
        <Segment.Group>
          <Segment inverted color="red">High Priority</Segment>
          {assignedTasks.map(task => {
            if (parseInt(task.priority) === 1)
            return (
              <Segment key={task.task_id} id={task.task_id}>
                <p>{`Task: ${task.task_id}`}</p>
                <div>{`Priority: ${task.priority}`}</div>
              </Segment>
            )
          })}
        </Segment.Group>
        <Segment.Group>
          <Segment inverted color="orange">Medium Priority</Segment>
          {assignedTasks.map(task => {
            if (parseInt(task.priority) === 2 || parseInt(task.priority) === 3)
            return (
              <Segment key={task.task_id} id={task.task_id}>
                <p>{`Task: ${task.task_id}`}</p>
                <div>{`Priority: ${task.priority}`}</div>
              </Segment>
            )
          })}
        </Segment.Group>
        <Segment.Group>
          <Segment inverted color="grey">Low Priority</Segment>
          {assignedTasks.map(task => {
            if (parseInt(task.priority) > 3) 
            return (
              <Segment key={task.task_id} id={task.task_id}>
                <p>{`Task: ${task.task_id}`}</p>
                <div>{`Priority: ${task.priority}`}</div>
              </Segment>
            )
          })}
        </Segment.Group>
      </Card.Content>
    </Card>
  )
}

export default Practitioner;

