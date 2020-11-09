import styled from 'styled-components/native';
export const colors = {
    primary: '#9B9987',
    primary_1:'#757466',
    secondary: '#483D3F',
    light:'#CCCCCC',
    light_1:'#F0F0F0',
    gray_1:'#C4C4C4',
    gray_2:'#838383'
}

export const Heading1 = styled.Text`
    font-size:24px;
    color: ${props => props.color ? props.color: 'black'};
    font-family: 'Fredoka One';
    text-align: ${props=>props.center? 'center':'start'};
`;
export const Heading2 = styled.Text`
    font-size:18px;
    color: ${props => props.color ? props.color: 'black'};
    font-family: 'Fredoka One';
    text-transform: ${props => props.transform ? props.transform: 'none'};
`;
export const Small = styled.Text`
    font-size:12px;
    color: ${props => props.color ? props.color: 'black'};
    font-family: 'Fredoka One';
    margin-left: ${props=>props.marginLeft ? props.marginLeft : 'auto'};
`;
