import React, {useContext} from 'react';
import { Header, Grid, FormButton } from 'semantic-ui-react';
import UserProfile from './UserProfile';
import PractitionerSearch from './PractitionerSearch';
import { SelectedPractitionersContext } from '../contexts/SelectedPractitionersContext';

const style = {
  topSection: {
    paddingTop: '2em',
  },
  test: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providersGrid: {
    marginTop: '-15em',
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
        <Grid.Column width={4} style={style.test}>
          <UserProfile />
          <PractitionerSearch />
        </Grid.Column>
        <section style={style.providersGrid}>
          <ul>
            {selectedPractitioners.map(practitioner => {
              return (
              <li key={practitioner.doctor_id}>{practitioner.first_name} {practitioner.last_name}</li>
              )
            })}
          </ul>
        </section>
      </Grid>
    </>
  );
}

export default PracticeDashboard;