import React, {useContext} from 'react';
import { Header, Grid, Card, Image } from 'semantic-ui-react';
import UserProfile from './UserProfile';
import PractitionerSearch from './PractitionerSearch';
import PractitionerCard from './PractitionerCard';
import { SelectedPractitionersContext } from '../contexts/SelectedPractitionersContext';

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
    marginTop: '-5em',
    marginLeft: '1em'
  }
};

const PracticeDashboard = () => {
  const [selectedPractitioners, setSelectedPractitioners] = useContext(SelectedPractitionersContext);

  return (
    <>
      <Grid style={style.topSection}>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          <Header as='h1' style={style.topHeader} textAlign='center'>Provider Dashboard</Header>
        </Grid.Column>
        <Grid.Column width={4} style={style.nav}>
          <UserProfile />
          <PractitionerSearch />
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