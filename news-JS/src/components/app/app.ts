import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApiResponse, INewsData, ISourcesData } from 'types/index';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document.querySelector('.sources')?.addEventListener('click', (e) => {
            console.log('Кнопка источника нажата');
            this.controller.getNews(e as MouseEvent, (apiResponse: IApiResponse) => {
                console.log('Получены данные от getNews', apiResponse);
                const newsData: INewsData = { articles: apiResponse.articles };
                console.log('newsData для рисования', newsData);

                this.view.drawNews(newsData);
            });
        });

        this.controller.getSources((apiResponse: IApiResponse) => {
            const sourcesData: ISourcesData = { sources: apiResponse.sources };
            this.view.drawSources(sourcesData);
        });
    }
}

export default App;
