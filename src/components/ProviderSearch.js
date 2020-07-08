import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const ProviderSearch = () => (
  <Modal
    trigger={<Button>Add Provider</Button>}
    header='Add a provider to the dashboard'
    content='List of searchable providers here'
    actions={['Close', { key: 'submit', content: 'Submit', positive: true }]}
  />
)

export default ProviderSearch;