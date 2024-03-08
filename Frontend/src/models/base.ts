export type BaseModel = {
  id: string;
};

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
};
