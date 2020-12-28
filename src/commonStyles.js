import styled from 'styled-components/native';
export const colors = {
    primary: '#9B9987',
    primary_1:'#757466',
    secondary: '#483D3F',
    light:'#CCCCCC',
    light_1:'#F0F0F0',
    gray_1:'#C4C4C4',
    gray_2:'#838383',
    contrast: '#AA7BC3',
    info:'#6987C9',
    success:'#32936F',
    danger:'#DD6B55'
}
export const styles = {
    heading1: {
        fontFamily: 'Fredoka One',
        fontSize: 24
    },
    heading2: {
        fontFamily: 'Fredoka One',
        fontSize: 18
    },
    small_light: {
        fontFamily: 'Fredoka One',
        fontSize: 12,
        color: 'white'
    }
}
export const ButtonPrimary = styled.TouchableOpacity`
    background-color: ${props=>props.choose===props.type?colors.secondary:colors.light_1};
    border-radius:${props=>props.rounded ? props.rounded : '8px'};
    height: ${props=>props.height};
    justify-content: center;
    align-items: center;
    margin:8px;
    width:${props=>props.width};
`;
export const ButtonSecondary = styled.TouchableOpacity`
    background-color: white;
    border-radius:${props=>props.rounded ? props.rounded : '8px'};
    border-width:1px;
    border-color: ${colors.secondary};
    height: ${props=>props.height};
    justify-content: center;
    align-items: center;
    margin:8px;
    width:${props=>props.width};
`;
export const ButtonText = styled.Text`
    font-size:12px;
    color: ${props => props.color ? props.color: 'white'};
    font-family: 'Fredoka One';
`;
export const Heading1 = styled.Text`
    font-size:24px;
    color: ${props => props.color ? props.color: 'black'};
    font-family: 'Fredoka One';
    text-align: ${props=>props.center? 'center':'left'};
`;
export const Heading2 = styled.Text`
    font-size:18px;
    color: ${props => props.color ? props.color: 'black'};
    font-family: 'Fredoka One';
    text-transform: ${props => props.transform ? props.transform: 'none'};
    margin: ${props=>props.margin?props.margin: '0px'};
    font-weight:${props=>props.bold?'bold':'normal'};
    text-align: ${props=>props.center? 'center':'left'};
`;
export const Small = styled.Text`
    font-size:12px;
    color: ${props => props.color ? props.color: 'black'};
    font-family: 'Fredoka One';
    margin-left: ${props=>props.marginLeft ? props.marginLeft : '0px'};
`;
