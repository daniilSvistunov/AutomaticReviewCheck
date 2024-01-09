export type DataFieldDefinition = {
  name: string;
  value?: string;
  translation: string;
  link?: boolean;
};

export type DataFieldProps = {
  field: DataFieldDefinition | undefined;
};
