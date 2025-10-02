import React from 'react';
import { useParams } from 'react-router-dom';

const TokenDetails = () => {
  const { tokenId } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Token Details</h1>
      <p>Token ID: {tokenId}</p>
      <p>This page is under development.</p>
    </div>
  );
};

export default TokenDetails;