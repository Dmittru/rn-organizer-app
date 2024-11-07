import {
    ScrollView, View
} from "react-native";
import {Button} from './Button'

export const NavBar=({navigation, loggedInUser})=> {
  return (
    <View>
    <ScrollView horizontal style={{display: 'flex', flexDirection: 'row', gap: '1rem', height: 70}}>
        <Button style={{height: 'auto'}} title="Путешествия" onPressFunc={()=>navigation.navigate('Trips', {loggedInUser})}/>
        <Button style={{height: 'auto'}} title="Места" onPressFunc={()=>navigation.navigate('Places', {loggedInUser})}/>
        <Button style={{height: 'auto'}} title="Взять-с-собой" onPressFunc={()=>navigation.navigate('Packing', {loggedInUser})}/>
        <Button style={{height: 'auto'}} title="Достижения" onPressFunc={()=>navigation.navigate('Goals', {loggedInUser})}/>
        <Button style={{height: 'auto'}} title="Пути" onPressFunc={()=>navigation.navigate('Routes', {loggedInUser})}/>
        <Button style={{height: 'auto'}} title="Советы" onPressFunc={()=>navigation.navigate('Tips', {loggedInUser})}/>
        <Button style={{height: 'auto'}} title="Статистика" onPressFunc={()=>navigation.navigate('Statistics', {loggedInUser})}/>
    </ScrollView>
    </View>
  )
}
