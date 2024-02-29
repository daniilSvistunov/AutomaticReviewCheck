import React from 'react';

const CustomConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  isOpen: any;
  title: any;
  message: any;
  onConfirm: any;
  onCancel: any;
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-dialog">
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default CustomConfirmDialog;
