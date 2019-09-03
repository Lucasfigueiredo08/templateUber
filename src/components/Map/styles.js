import styled, { css } from 'styled-components';
import { Platform } from 'react-native'

export const LocationBox = styled.View`
  background: #FFF;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 3px;
  flex-direction: row;

  ${Platform.select({
    ios: css`
      margin-top: 20px;
    `,
    android: css`
      margin-top: 15px;
      margin-left: 15px;
    `
  })}
`;


export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #333;
`
