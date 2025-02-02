import { Stack, TextField, TextFieldProps } from '@mui/material';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import useEventListener from '../../hooks/useEventListener';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  keyName: string;
  inputs: string[];
};

export default function RHFCodes({ keyName = '', inputs = [], ...other }: Props) {
  const codesRef = useRef<HTMLDivElement>(null);

  const { control, setValue } = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaste = (event: any) => {
    let data = event.clipboardData.getData('text');

    data = data.split('');

    inputs.forEach((input, index) => setValue(input, data[index]));

    event.preventDefault();
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace(keyName, '');

    const fieldIntIndex = Number(fieldIndex);

    const nextfield: HTMLElement | null = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }

    if (value.length >= maxLength && fieldIntIndex < 6 && nextfield !== null) {
      nextfield.focus();
    }

    handleChange(event);
  };

  useEventListener('paste', handlePaste, codesRef);

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder="-"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  '& input': { p: 0, textAlign: 'center' },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: 'number',
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
}
