import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { colors } from '../commonStyles';

import HomeIcon from '../assets/icons/home.svg';
import SearchIcon from '../assets/icons/search.svg';
import WriterIcon from '../assets/icons/writer.svg';
import LibraryIcon from '../assets/icons/library.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import { useDispatch, useSelector } from 'react-redux';



const TabArea = styled.View`
    background-color: ${colors.primary};
    flex-direction: row;
    height: 9%;
`;
const TabItem = styled.TouchableOpacity`
    flex:1;
    align-items: center;
    justify-content:center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width:72px;
    height:72px;
    justify-content: center;
    align-items: center;
    background-color: ${colors.secondary};
    border-radius: 35px;
    margin-top: -20px;
`;


export default ({state, navigation})=>{
    const dispatch = useDispatch();
    const goTo = (screenName)=>{
        navigation.navigate(screenName);
    }
    useEffect(()=>{
        dispatch({type: 'SET_VISIBLE', payload:{visible: true}});
    }, []);

    const visible = useSelector(state=>state.action.visible);
    //console.log(visible);
    return(
        visible ?
            <TabArea>
                <TabItem onPress={()=>goTo('Home')}>
                    <HomeIcon width="24" height="24" fill={state.index===0 ? 'white': 'black'} />
                </TabItem>
                <TabItem onPress={()=>goTo('Search')}>
                    <SearchIcon width="24" height="24" fill={state.index===1 ? 'white': 'black'} />
                </TabItem>
                <TabItemCenter onPress={()=>goTo('WriterStack')}>
                    <WriterIcon width="32" height="32" fill='white' />
                </TabItemCenter>
                <TabItem onPress={()=>goTo('Library')}>
                    <LibraryIcon width="24" height="24" fill={state.index===3 ? 'white': 'black'} />
                </TabItem>
                <TabItem onPress={()=>goTo('Profile')}>
                    <ProfileIcon width="24" height="24" fill={state.index===4 ? 'white': 'black'} />
                </TabItem>
            </TabArea>
        : null
    );
}