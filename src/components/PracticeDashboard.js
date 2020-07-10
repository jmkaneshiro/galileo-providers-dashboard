import React, {useContext} from 'react';
import { Header, Grid, Card, Button, Segment } from 'semantic-ui-react';
import UserProfile from './UserProfile';
import PractitionerSearch from './PractitionerSearch';
import PractitionerCard from './PractitionerCard';
import { SelectedPractitionersContext } from '../contexts/SelectedPractitionersContext';
import { AvailPractitionersContext } from '../contexts/AvailPractitionersContext';
import axios from 'axios';

const style = {
  topSection: {
    paddingTop: '2em',
  },
  topHeader: {
    marginTop: '2em'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providersGrid: {
    marginTop: '1em',
    marginLeft: '1em'
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
};

const PracticeDashboard = () => {
  const [selectedPractitioners, setSelectedPractitioners] = useContext(SelectedPractitionersContext);
  const [availPractitioners, setAvailPractitioners] = useContext(AvailPractitionersContext);

  const handleRemoveAll = () => {
    if (selectedPractitioners.length > 0) {
      addAllAvailPracititioners();
      setSelectedPractitioners([]);
    }
  };

  const addAllAvailPracititioners = (async () => {
    const practitioners = await axios.get(
      'https://testapi.io/api/akirayoglu/0/reference/getDoctors'
    );
    setAvailPractitioners(practitioners.data);
  });

  return (
    <>
      <Grid style={style.topSection}>
        <Grid.Column width={5} />
        <Grid.Column width={6}>
          <Header as='h1' style={style.topHeader} textAlign='center'>Provider Dashboard</Header>
        </Grid.Column>
        <Grid.Column width={5} style={style.nav}>
          <Segment>
            <UserProfile />
            <div style={style.cardActions}>
              <PractitionerSearch />
              <Button onClick={handleRemoveAll}>Remove All Providers</Button>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
      <main style={style.providersGrid}>
        <Card.Group as="section" centered>
          {selectedPractitioners.map(practitioner => {
            return (
              <PractitionerCard key={practitioner.doctor_id} practitioner={practitioner} />
            )
          })}
        </Card.Group>
      </main>
    </>
  );
}

export default PracticeDashboard;