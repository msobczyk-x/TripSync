import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { Button, HStack, Input } from 'native-base'
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
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });
  
  const CELL_COUNT = 6;

const LoginStudentCode = ({navigation}:any) => {
  const [error, setError] = useState('')
    const {login} = useAuth()
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const submit = () => {
        console.log
        axios.post("http://10.0.2.2:5000/api/loginStudentCode", {
            code: value
        }).then((res) => {
            if (res.status === 400) {
                setError(res.data)
            }
            else if(res.status === 200
              )
           {
            login(res.data, "student");
           }
               
            
        }).catch((err) => {
            setError(err.response.data)
            console.log(err)
        }
        )
    }
  return (
    <View style={
        {flex: 1,
        justifyContent:"center",
        alignItems: "center",
        gap: 10
        }
    }>
      <Text>LoginStudentCode</Text>
      <Text>Enter Code</Text>
      <Text style={styles.title}>Verification</Text>
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
    <Button onPress={(e)=> {
        e.preventDefault()
        submit()
    
    }}>


        <Text>Submit</Text>
    </Button>
      {error && <Text>{error}</Text>}
    </View>
  )
}

export default LoginStudentCode