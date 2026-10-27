'use client';

import { NumberFormatBase, usePatternFormat, type PatternFormatProps } from 'react-number-format';

// The 10-digit US number without the country code. US area codes never start with 1, so every
// leading 1 is the country code: the +1 shown in the field or a 1 the visitor typed themselves.
export function usNationalDigits(value: string) {
  return value.replace(/\D/g, '').replace(/^1+/, '').slice(0, 10);
}

export function isValidUsPhone(value: string) {
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(usNationalDigits(value));
}

type UsPhoneInputProps = Omit<PatternFormatProps, 'format' | 'mask'>;

// +1 is part of the mask. A typed 1 (or a pasted/autofilled +1...) is dropped instead of taking
// the first slot, which used to push the last digit out: "1206293806" on 2026-10-24.
export default function UsPhoneInput(props: UsPhoneInputProps) {
  const patternProps = usePatternFormat({ ...props, format: '+1 (###) ###-####', mask: '_' });
  const removeFormatting = patternProps.removeFormatting!;

  return (
    <NumberFormatBase
      {...patternProps}
      type="tel"
      autoComplete="tel"
      removeFormatting={(inputValue, changeMeta) => usNationalDigits(removeFormatting(inputValue, changeMeta))}
    />
  );
}
