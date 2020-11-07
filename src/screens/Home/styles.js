import styled from 'styled-components/native';
import { colors } from '../../commonStyles';
const theme = 'LIGHT';
export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${theme ? 'white' : 'black'};
`;

export const Header = styled.View`
    background-color: ${colors.primary};
    justify-content: space-between;
    flex-direction: row;
    padding: 16px;
`;
export const FilterButton = styled.TouchableOpacity``;
export const Logo = styled.Text`
    font-size:18px;
    color: white;
`;
export const DirectButton = styled.TouchableOpacity``;

export const TabChoose = styled.View`
    margin-top:32px;
    flex-direction:row;
    justify-content:center;
    padding:0px 32px;
`;
export const ChooseItem = styled.TouchableHighlight`
    background-color: ${props=>props.choose===props.type ?colors.secondary:colors.light_1};
    border-radius:8px;
    height: 32px;
    justify-content: center;
    align-items: center;
    flex: ${props=>props.choose===props.type ? 1.1:1};
    margin:0px ${props=>props.choose===props.type ? '0px':'-8px'};
    z-index:${props=>props.choose===props.type ? 2:1};
`;
export const ChooseItemText = styled.Text`
    color: ${props=>props.choose===props.type ?'white':colors.light};
    font-size:12px;
`;

export const Poem = styled.View`
    justify-content: center;
    align-items: center;
    margin-top:32px;
`;

export const PoemTitle = styled.Text`
    font-size: 24px;
    margin: 16px 0px;
`;
export const PoemPages = styled.Text`
    font-size:12px;
    margin:0px 32px;
    align-self: flex-end;
`;
export const PoemBody = styled.Text`
    font-size: 12px;
    line-height:18px;
`;

export const OptionsPage = styled.View`
    position:absolute;
    top:35%;
    right: ${props=>props.position === 'right'? 0:'auto'};
    left: ${props=>props.position === 'left'? 0:'auto'};
`;

export const OptionItemFollow = styled.TouchableOpacity`
    margin: 12px 16px;
    width:40px;
    height:40px;
    background-color: ${colors.secondary};
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`;
export const OptionItem = styled.TouchableOpacity`
    margin: 12px 16px;
    justify-content: center;
    align-items: center;
`;
export const OptionNumberItem = styled.Text`
    font-size:12px;
    color:${colors.secondary};
`;
export const OptionFollowItem = styled.TouchableOpacity`
    position: absolute;
    bottom:0;
    right: 0;
    background-color: gray;
    width: 18px;
    height:18px;
    border-radius:9px;
    justify-content: center;
    align-items: center;
`;
export const OptionFollowItemText = styled.Text`
    font-size:8px;
`;

export const NextPage = styled.TouchableOpacity`
    margin-top:16px;
    justify-content: center;
    align-items:center;
`;

export const ModalArea = styled.TouchableHighlight`
    width:100%;
    height:${props=>props.height?props.height : '50%'};
    background-color: rgba(0,0,0,0.5);
`;
export const ModalContainer = styled.View`
    width:100%;
    height:${props=>props.height?props.height : '50%'};
    background-color: ${props=>props.bgColor ? props.bgColor : colors.primary};
    padding-top:32px;
`;
export const ModalComments = styled.View`
    width:100%;
    height:70%;
    background-color: white;
    padding-top:32px;
`;
export const CloseModalButton = styled.TouchableOpacity`
    margin-top: ${props=>props.marginTop ? props.marginTop : '32px'};
    width:100%;
    align-items: center;
    justify-content: center;
`;
export const ListComments = styled.View`
    flex:1;
    padding:16px;
`;
export const CommentItem = styled.View`
    background-color: #ccc;
    width:100%;
    height:60px;
    border-radius:16px;
    margin:8px 0px;
    padding:8px;
`;
export const CommentAuthor = styled.Text`
    font-size:12px;
    font-weight:bold;
    color:black;
`;
export const Comment = styled.Text`
    font-size:18px;
    color:black;
`;
export const ListFilter = styled.View`
    margin-left:32px;
    width:100%;
    height:35%;
`;
export const ListFilterText = styled.Text`
    color:white;
    font-size:12px;
    margin-bottom: 16px;
`;
export const ListFilterScroll = styled.ScrollView`
`;

export const ChooseItemFilter = styled.TouchableHighlight`
    background-color: ${props=>props.active ?colors.secondary:colors.light_1};
    border-radius:8px;
    height: 32px;
    justify-content: center;
    align-items: center;
    width:150px;
    margin-right: 16px;
`;
export const ChooseItemFilterText = styled.Text`
    color: ${props=>props.active ?'white':colors.light};
    font-size:12px;
    text-transform: uppercase;
`;

export const Credits = styled.View`
    height:50%;
`;
export const CreditSocial = styled.View`
    margin-bottom:8px;
    flex-direction:row;
    justify-content: space-between;
`;
export const CreditSocialText = styled.Text`
    font-size:12px;
`;
export const ButtonFollow = styled.TouchableOpacity`
    margin-top:8px;
    background-color:${colors.secondary};
    border-radius:8px;
    height: 40px;
    justify-content: center;
    align-items: center;
    width:150px;
`;
export const ButtonFollowText = styled.Text`
    color:white;
    font-size:12px;
    text-transform: uppercase;
    font-family: 'Fredoka One';
`;

export const InputArea = styled.View`
    position:absolute;
    bottom:0px;
    flex-direction:row;
    background-color:#DDD;
    border-width:1px;
    border-color: ${colors.primary};
    padding:8px;
    border-radius:8px;
    border-bottom-left-radius:0px;
    border-bottom-right-radius:0px;
    justify-content:center;
    align-items:center;
    width:100%;
    height:56px;
`;
export const InputComment = styled.TextInput`
    flex:1;
`;


