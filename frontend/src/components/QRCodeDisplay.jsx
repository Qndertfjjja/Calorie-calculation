import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeDisplay = ({ data }) => {
  return (
    <div>
      <QRCode value={JSON.stringify(data)} />
    </div>
  );
};

export default QRCodeDisplay;
