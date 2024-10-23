"use client";
import React from 'react';

interface AddressValidationProps {
  address?: string | null;
}
const AddressValidation: React.FC<AddressValidationProps> = ({ address }) => {
  return (
    <div>

      <p>
        Adresse: {address ? address : "Adresse non spécifiée"}
      </p>
      {address && (
        <p>Cette adresse est valide pour la validation.</p>
      )}
    </div>
  );
};

export default AddressValidation;
