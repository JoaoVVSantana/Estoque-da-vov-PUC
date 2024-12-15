import React from 'react';
import { Button } from 'react-bootstrap';

import './Btn.css'

export default function Btn({ text, icon, size, onClick, variant }) {
  return (
    <Button className="button mb-4" variant={variant ? variant : "none btn-color"} size={size} onClick={onClick}>
      {icon} {text}
    </Button>
  );
}