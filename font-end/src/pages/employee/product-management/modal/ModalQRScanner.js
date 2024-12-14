import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "antd";
import { QrReader } from "react-qr-reader";

const QRScannerModal = ({ visible, onCancel, onQRCodeScanned }) => {
  const [qrCode, setQRCode] = useState(null);
  const qrReaderRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setQRCode(data.text);
      onQRCodeScanned(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleCloseModal = () => {
    if (qrReaderRef.current) {
      qrReaderRef.current.closeImageDialog();
    }
    setQRCode(null);
    onCancel();
  };

  useEffect(() => {
    if (!visible && qrReaderRef.current) {
      qrReaderRef.current.closeImageDialog();
    }
  }, [visible]);

  return (
    <Modal
      title="Quét QR"
      visible={visible}
      onCancel={handleCloseModal}
      footer={[
        <Button key="cancel" onClick={handleCloseModal}>
          Hủy
        </Button>,
      ]}
    >
      <QrReader
        delay={300}
        onError={handleError}
        style={{ width: "100%" }}
        onResult={handleScan}
        ref={qrReaderRef}
      />
      {qrCode && <p>Mã QR Code: {qrCode}</p>}
    </Modal>
  );
};

export default QRScannerModal;
