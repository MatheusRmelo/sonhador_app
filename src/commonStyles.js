import styled from 'styled-components/native';
export const colors = {
    primary: '#9B9987',
    secondary: '#483D3F',
    light:'#CCCCCC',
    light_1:'#F0F0F0'
}

export const Heading1 = styled.Text`
    font-size:24px;
    color: ${props => props.theme === 'light' ? 'white': 'black'};
    font-family: 'Fredoka One';
`;
