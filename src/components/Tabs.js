import React from 'react';
import styled from 'styled-components/native';

import { colors, Heading2 } from '../commonStyles';

const TabArea = styled.View`
    flex-direction: row;
    flex:1;
`;
const TabItem = styled.TouchableHighlight`
    border-bottom-width:6px;
    border-bottom-color: ${props=> props.active ? colors.primary : colors.gray_1};
    flex:1;
    justify-content: center;
    align-items: center;
`;

export default ({tabs, setActive}) => {
    return(
        <TabArea>
            {
                tabs.map((item, key)=>(
                    <TabItem key={key} active={item.active} onPress={()=>setActive(key)} underlayColor="transparent">
                        <Heading2 transform="uppercase">{item.name}</Heading2>
                    </TabItem>
                ))
            }
        </TabArea>
    );
}