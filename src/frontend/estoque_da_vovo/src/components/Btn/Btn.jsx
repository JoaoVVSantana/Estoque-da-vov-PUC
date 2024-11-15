import React from 'react';
import { Button } from 'react-bootstrap';

import './Btn.css'

export default function Btn({ text, icon, size }) {
  return (
    <Button className="button mb-4" variant='none' size={size}>
      {icon} {text}
    </Button>
  );
}