import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL!, {
            apiKey: '08354b6d9e134f3b82c8a715f14853e9',
        });
    }
}

export default AppLoader;
