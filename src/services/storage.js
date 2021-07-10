import AsyncStorage from '@react-native-community/async-storage';

export const _storeUser = async username => {
    try {
      await AsyncStorage.setItem("username", username);
    } catch (error) {
      console.log("Error saving data", error);
    }
  };
  
  export const _retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem("username");

      if (value !== null) return value
    } catch (error) {
      console.log("Error retrieving data", error)
    }
    return false
  };
  
  export const _deleteUser = async () => {
    try {
      await AsyncStorage.removeItem("username");
    } catch (error){
        console.log("Error deleting data", error)
    }
  };