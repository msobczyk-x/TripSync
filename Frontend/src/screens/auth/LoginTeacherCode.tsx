import { View} from 'react-native'
import React, {useState} from 'react'
import { Button, HStack, Input, Box, VStack, Flex, Text } from 'native-base'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';
import { useAuth } from '../../providers/AuthProvider';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20, gap:5},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#323031',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });
  
  const CELL_COUNT = 6;

const LoginTeacherCode = ({navigation}:any) => {
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const submit = () => {
        console.log
        axios.post("http://192.168.1.24:3000/api/loginTeacherCode", {
            code: value
        }).then((res) => {
            if (res.status === 400) {
                setError(res.data)
            }
            else if(res.status === 200)
            {
              login(res.data, "Teacher");
            }
                
              
        }).catch((err) => {
            console.log(err)
            setError(err.response.data)
        }
        )
    }
  return (
    <Box flex="1" safeAreaTop>
      <VStack space={4} w={"100%"}>
      <Text fontSize={25} textAlign={"center"}>Enter the code sent to your email</Text>

      <Text fontSize={25} fontWeight={"bold"} textAlign={"center"}>Verification code</Text>
      <Flex w={"100%"} alignItems={"center"}>
      {error && <Text textAlign={"center"} fontWeight={600} fontSize={"2xl"}color={"danger.500"}>{error}</Text>}
     
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
       </Flex>
    
    <Button onPress={(e)=> {
        e.preventDefault()
        submit()
    
    }} mt={24}   bg={'blue.600'}
    size="lg"
    maxW={150}
    minW={150} alignSelf={"center"}>


       Submit
    </Button>
    </VStack>
     
    </Box>
  )
}

export default LoginTeacherCode