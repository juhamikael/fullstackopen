import 'ts-node/register';
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
    name: 'Rate repository app',
    slug: 'rate-repository-app',
    extra: {
        apolloUri: process.env.APOLLO_URI,
    },
};

export default config;
