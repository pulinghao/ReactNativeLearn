import React from "react";
import Cities from './Cities/Cities'
import City from './Cities/City'
import AddCity from './AddCity/AddCity'
import {colors} from './theme'

import {createBottomTabNavigator, createStackNavigator,} from 'react-navigation'

const options = {
    navigationOptions:{
        headerStyle:{
            backgroundColor: colors.primary
        },
        headerTintColor:'#fff'
    }
}

const CitiesNav = createStackNavigator({
    Cities:{screen:Cities},
    City:{screen:City}
},options)

const Tabs = createBottomTabNavigator({
    Cities:{sreen:CitiesNav},
    AddCity:{screen:AddCity}
})

export default Tabs
