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
export const PoemArea = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`;
export const CategoryPhoto = styled.View`
    width:70px;
    height:70px;
    border-radius:35px;
    background-color: gray;
`;
export const PoemInfo = styled.View`
`;

export const OptionBook = styled.TouchableHighlight`
    position:absolute;
    bottom:8%;
    right:64px;
    background-color:white;
    width:50%;
    height:30%;
    border-radius:16px;
    padding:8px;
`;
export const OptionItem  = styled.TouchableOpacity`
    flex-direction:row;
    padding:0px 8px;
    margin:16px 0px;
`;
export const OptionTextArea = styled.View`
    flex:1;
    border-bottom-width:1px;
    border-bottom-color: #CCC;
    padding:0 8px;
    margin:0 8px;
`;
export const ButtonAddPoem = styled.TouchableOpacity`
    position:absolute;
    bottom:3%;
    right:16px;
    background-color:${colors.contrast};
    width:48px;
    height:48px;
    border-radius:32px;
    justify-content:center;
    align-items:center;
`;
export const ButtonAddPoemText = styled.Text`
    font-size:32px;
    color:white;
`;

export const FilterArea = styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    margin:8px;
    width:100%;
`;

export const ModalArea = styled.TouchableOpacity`
    flex:1;
    background-color: rgba(0,0,0,0.5);
    justify-content:flex-end;
`;
export const ModalContainer = styled.TouchableHighlight`
    background-color:white;
    border-radius:16px;
    width:100%;
    height:${props=>props.height?props.height:'65%'};
    align-items:center;
`;
export const SearchModal = styled.View`
    flex:1;
    background-color:white;
`;

export const GroupAction = styled.View`
    width:100%;
    border-bottom-width:1px;
    border-bottom-color:${props=>props.color?props.color:'#CCC'};
    padding:0px 32px;
`;
export const GroupArea = styled.TouchableOpacity`
    flex-direction:row;
    height:50px;
    align-items:center;
    background-color:${props=>props.active?colors.info:'transparent'};
    border-radius:16px;
    margin:${props=>props.active?'8px':'0px'};
    padding:${props=>props.active?'16px':'0px'};
`;
export const ButtonPublish = styled.TouchableOpacity`
    border-radius:60px;
    width:200px;
    height:50px;
    background-color: ${colors.secondary};
    margin:16px;
    align-items:center;
    justify-content:center;
`;

