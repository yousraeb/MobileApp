import { View , Text, ScrollView, TouchableOpacity, Image,TextInput } from "react-native";
import React , {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBtn, Button } from "../components";
import styles from "./login.style";
import { Formik } from "formik";
import * as Yup from 'yup';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { COLORS } from "../constants";


const validationSchema = Yup.object().shape({
    
    password: Yup.string()
      .min(8, ' Password must be at least 8 characters ')
      .required('Required'),
    email: Yup.string().email('Provide a valid email address').required('Required'),
  });

const LoginPage =({navigation}) => {
    const [loader, setLoader]= useState(false);
    const [responseDta , setResponseData]= useState(null);
    const [obsecureText, setObsecureText]= useState(false);
   
    return (
    <ScrollView>
        <SafeAreaView style={{marginHorizontal : 20}}>
            <View>
                <BackBtn onPress={()=>navigation.goBack()}/>
                <Image 
                source={require('../assets/images/bk.png')}
                style={styles.cover}
                />   
                <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
                <Formik
                initialValues={{email:'',password:'' }}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
                >
                  {({ handleChange, handleBlur,touched, handleSubmit, values, errors,isValid, setFieldTouched }) => (
                <View>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper(touched.email ? COLORS.secondary:COLORS.offwhite)}>
                            <MaterialCommunityIcons
                            name='email-outline'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                            />
                            <TextInput placeholder="Enter email"
                            onFocus={()=>{setFieldTouched('email')}}
                            onBlur={()=>{setFieldTouched('email','')}}
                            value="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{flex : 1 }}
                            />
                        </View>

                    {touched.email && errors.email &&(
                        <Text style={styles.errorMessage}>(errors.email)</Text>
                    )}
                    </View>




                <Button title={"L O G I N"} onPress={()=>{}}/>
                





                </View>
     )}          
                    
                
                </Formik>


                
                
            </View>

        </SafeAreaView>
    </ScrollView>
    )
}
export default LoginPage
