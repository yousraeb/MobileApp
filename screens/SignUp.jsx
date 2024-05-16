import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBtn, Button } from "../components";
import styles from "./login.style";
import { Formik } from "formik";
import * as Yup from 'yup';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS } from "../constants";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Provide a valid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
});

const SignupPage = ({ navigation }) => {
  const [obsecureText, setObsecureText] = useState(true);

  const signUp = async (values) => {
    try {
      // Call your API to register user
      const response = await fetch('http://192.168.100.158:8080/api/suppliers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password
        }),
      });

      const data = await response.json();
      console.log(data);

      // If registration is successful, navigate to login page
      if (response.ok) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'An error occurred while signing up. Please try again later.');
    }
  };

  const inValidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [
        { text: "Cancel", onPress: () => { } },
        { text: "Continue", onPress: () => { } },
      ],
      { defaultIndex: 1 }
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.cover}
          />
          <Text style={styles.title}>Create an Account</Text>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={signUp}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputWrapper(touched.name ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name='account-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter full name"
                      onFocus={() => { setFieldTouched('name') }}
                      onBlur={() => { setFieldTouched('name', '') }}
                      value={values.name}
                      onChangeText={handleChange('name')}
                      autoCapitalize="words"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name='email-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => { setFieldTouched('email') }}
                      onBlur={() => { setFieldTouched('email', '') }}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name='lock-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter password"
                      secureTextEntry={obsecureText}
                      onFocus={() => { setFieldTouched('password') }}
                      onBlur={() => { setFieldTouched('password', '') }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => { setObsecureText(!obsecureText) }}>
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button title={"S I G N U P"} onPress={isValid ? handleSubmit : inValidForm} isValid={isValid} />
                <Text style={styles.alreadyRegistered} onPress={() => { navigation.navigate('Login') }}>Already have an account? Login</Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignupPage;
