import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL || '', {
            apiKey: '63cac18bd4ee4f75a2ea2b1a787a5dcb',
        });
    }
}

export default AppLoader;
