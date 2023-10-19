import React, { useState, useEffect } from 'react';

const AlertMessage = ({ message, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-cerrar la alerta después de unos segundos (opcional)
    const timeout = setTimeout(() => {
      setShow(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return show ? (
    <div className="alert alert-success">
      {message}
    </div>
  ) : null;
};

export default AlertMessage;
