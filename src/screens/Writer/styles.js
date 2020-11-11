import styled from 'styled-components/native';
import { colors } from '../../commonStyles';

const theme = 'LIGHT';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${theme ? 'white' : 'black'};
`;
export const PoemList = styled.ScrollView`
    flex:1;
    padding:16px;
    margin-bottom:9%;
`;
export const CategoryPhoto = styled.View`
    width:70px;
    height:70px;
    border-radius:35px;
    background-color: gray;
`;
export const PoemInfo = styled.View`
`;
export const ButtonAddPoem = styled.TouchableOpacity`
    position:absolute;
    bottom:8%;
    right:16px;
    background-color:${colors.contrast};
    width:64px;
    height:64px;
    border-radius:32px;
    justify-content:center;
    align-items:center;
`;
export const ButtonAddPoemText = styled.Text`
    font-size:40px;
    color:white;
`;
