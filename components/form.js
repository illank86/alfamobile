import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


const Forms = (props) => {
    return(
        <View>
            <FormLabel>{props.name}</FormLabel>
            <FormInput 
                selectionColor='#000'
                autoCorrect={false}
                ref={props.refer} 
                value ={props.value}
                underlineColorAndroid="#CED0CE" 
                inputStyle={{paddingLeft: 5}} 
                placeholder={props.placeholder}
                editable={props.edit}
                onChangeText={props.onChangeText}/>
                {props.validation == true ?<FormValidationMessage>
                    {props.message}
                </FormValidationMessage> : null } 
        </View>  
    )
}

export default Forms;