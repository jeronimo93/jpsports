import React, { useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { colors, fonts, radii } from '../tokens';

export type InputProps = Omit<TextInputProps, 'style'> & {
  focused?: boolean;
  style?: TextInputProps['style'];
};

export function Input({ focused: focusedProp, style, onFocus, onBlur, ...rest }: InputProps) {
  const [internalFocus, setInternalFocus] = useState(false);
  const focused = focusedProp ?? internalFocus;

  return (
    <TextInput
      {...rest}
      onFocus={(e) => {
        setInternalFocus(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setInternalFocus(false);
        onBlur?.(e);
      }}
      placeholderTextColor={colors.fog2}
      style={[
        styles.base,
        focused && { borderColor: colors.volt },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    backgroundColor: colors.court,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.rSm,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: colors.chalk,
    fontFamily: fonts.body,
    fontSize: 16,
  },
});
