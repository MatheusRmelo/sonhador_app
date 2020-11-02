import styled from 'styled-components/native';
const theme = 'LIGHT';
export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${theme ? 'white' : 'black'};
    justify-content: center;
    align-items: center; 
`;