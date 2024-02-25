import './sources.css';

interface SourceItem {
    id: string;
    name: string;
}

class Sources {
    draw(data: SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Element with ID "sourceItemTemp" not found');
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceNameElement = sourceClone.querySelector('.source__item-name');
            if (sourceNameElement) {
                sourceNameElement.textContent = item.name;
            }

            const sourceItemElement = sourceClone.querySelector('.source__item');
            if (sourceItemElement) {
                sourceItemElement.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
