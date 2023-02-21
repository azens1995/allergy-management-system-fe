import React, { useState } from 'react';
import AllergyModal from '../components/allergyModal';

export default function Sample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <AllergyModal setIsOpen={setIsOpen} />}
    </main>
  );
}
