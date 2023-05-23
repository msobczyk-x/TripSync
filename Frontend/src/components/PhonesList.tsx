import { VStack, Flex, Heading, Text, Button, Divider } from 'native-base'
import React from 'react'
import axios from 'axios'
import {Linking} from 'react-native'
import { sortByLastName } from '../utils/utils'
import * as SecureStore from 'expo-secure-store'

const PhonesList = ({tripId}:any) => {
    const [phones, setPhones] = React.useState<any>([])



    React.useEffect(() => {

        SecureStore.getItemAsync('studentsPhones').then((phones) => {
            if (phones){
                setPhones(JSON.parse(phones))
            }
            else {
                axios.get(`http://192.168.1.24:3000/api/getTripStudentsPhoneNumbers/${tripId}`).then((response) => {
                    setPhones(sortByLastName(response.data))
                    SecureStore.setItemAsync('studentsPhones', JSON.stringify(response.data))
            }).catch((error) => {
                console.log(error)
            })
            }
        })
        
}, [])    


        
        return (
    <Flex>

        <Heading marginBottom={2}>Phone numbers</Heading>

        <VStack space={8}>
            {phones.map((phone:any, index:any) => {

                return (
                    <Flex key={index}>
                    <Flex direction='row'  justifyContent={"space-between"} alignItems={"center"} marginBottom={1}>
                        <Heading size="sm">{index+1}</Heading>
                    
                    <Heading size="sm">{phone.first_name} {phone.last_name}</Heading>
                    <Button bgColor={"white"} size="sm" onPress={() => {

                    Linking.openURL(`tel:${phone.phone_number}`)
                    }}><Text>Call student</Text></Button>
                   
                    <Button bgColor={"white"} size="sm" onPress={() => {
                        Linking.openURL(`tel:${phone.parent_phone_number}`)
                    }
                    }><Text>Call parent</Text></Button>
                    </Flex>
                    <Divider/>
                    </Flex>
            )})}
        </VStack>
    </Flex>
  )
}

export default PhonesList