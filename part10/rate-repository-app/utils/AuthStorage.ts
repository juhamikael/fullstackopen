import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    namespace: string;

    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken(): Promise<string | null> {
        const token = await AsyncStorage.getItem(
            `${this.namespace}:accessToken`
        );
        return token;
    }
  
    async setAccessToken(accessToken: string): Promise<void> {
        await AsyncStorage.setItem(
            `${this.namespace}:accessToken`,
            accessToken
        );
    }
  
    async removeAccessToken(): Promise<void> {
        await AsyncStorage.removeItem(
            `${this.namespace}:accessToken`
        );
    }
}
  
export default AuthStorage;