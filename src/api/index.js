import AsyncStorage from '@react-native-community/async-storage';

const url = `https://sg-ants-server.herokuapp.com/graphql`
export async function fetchAnts() {
    return (
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        ants {
                            name
                            length
                            color
                            weight
                        }
                    }
                `
            }),
        }).then(response => response.json()).then(data => data))
}

export const _storeUser = async username => {
    console.log("storing user Async Storage");
    try {
      await AsyncStorage.setItem("username", username);
      console.log("Username successfully stored")
    } catch (error) {
      console.log("Error saving data");
      console.log(error);
    }
  };
  
  // fetch the data back asynchronously
  export const _retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        // Our data is fetched successfully
        console.log("coming from AsyncStorage:", value);
        return value
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error retrieving data")
      console.log(error)
    }
    return false
  };
  
  export const _deleteUser = async () => {
    try {
      await AsyncStorage.removeItem("username");
      console.log("Data removed from AsyncStorage")
    } catch (error){
        console.log("Error deleting data")
        console.log(error)
    }
  };
