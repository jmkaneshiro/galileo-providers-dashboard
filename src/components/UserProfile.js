import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import userImage from '../images/user-image.png';

const style = {
  wrapper: {
    margin: '1em',
  },
};


const UserProfile = () => {
  return (
    <Segment as='nav' style={style.wrapper}>
      <Image src={userImage} size='mini' alt="user profile image" className="ui centered image circular" />
      <Header as='h3' textAlign='center'>Current User Admin</Header>
    </Segment>
  );
}

export default UserProfile;