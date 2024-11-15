import React from 'react';
import { Button } from 'react-bootstrap';

export default function Btn({ text }) {
  return (
    <Button variant="secondary" className="mb-3">
      {text}
    </Button>
  );
}