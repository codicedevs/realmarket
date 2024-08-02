import React from 'react';
import LoaderModal from './LoaderModal';

const Spinner = ({ show }) => {
  if (!show) return null

  return (
    <LoaderModal />
  )
}

export default Spinner