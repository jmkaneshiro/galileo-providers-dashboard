import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import UserProfile from './UserProfile';
import ProviderSearch from './ProviderSearch';

const style = {
  topSection: {
    paddingTop: '2em',
  },
  test: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const Dashboard = () => {
  return (
    <>
      <Grid style={style.topSection}>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          <Header as='h1' style={style.topHeader} textAlign='center'>Provider Dashboard</Header>
        </Grid.Column>
        <Grid.Column width={4} style={style.test}>
          <UserProfile />
          <ProviderSearch />
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Dashboard;