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
    <>
      <Image src={userImage} size='tiny' alt="user profile image" className="ui centered image circular" />
      <Header as='h3' textAlign='center'>Current User Admin</Header>
    </>
  );
}

export default UserProfile;