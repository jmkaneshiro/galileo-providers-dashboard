import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image } from 'semantic-ui-react';
import userImage from '../images/user-image.png';


const Practitioner = ({practitioner}) => {
  const [userTasks, setUserTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  const getTasks = (async () => {
    const allTasks = await axios.get(
      'https://testapi.io/api/akirayoglu/0/tasks/getTasks'
    );
    const userTasks = await allTasks.data.filter(task => task.owner === practitioner.doctor_id);
    setUserTasks(userTasks);
  });

  return (
    <Card as='article' key={practitioner.doctor_id} practitioner={practitioner}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={userImage}
          alt={`${practitioner.first_name} ${practitioner.last_name}'s profile photo`}
        />
        <Card.Header>{`${practitioner.first_name} ${practitioner.last_name}`}</Card.Header>
        <Card.Meta>{`${practitioner.first_name}'s tasks`}</Card.Meta>
        {userTasks.map(task => {
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

