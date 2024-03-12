import { module } from 'modujs';
import Swup from 'swup';
import SwupFragmentPlugin from '@swup/fragment-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
// import SwupBodyClassPlugin from '@swup/body-class-plugin';
import { body } from '../utils/environment';



export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        const load = new Swup({
            animateHistoryBrowsing: true,

            containers: ['[data-load-container]'],
            cache: true,
            plugins: [
                new SwupPreloadPlugin(),
                // new SwupBodyClassPlugin(),
                new SwupFragmentPlugin({
                    rules: [
                        {
                            from: ['/:page?' ],
                            to: ['/agency'],
                            containers: ['#agency'],
                            name: 'open-modal',
                        },
                        {
                            from: ['/:page?'],
                            to: ['/highlights'],
                            containers: ['#highlights'],
                            name: 'open-modal',
                        },

                        {
                            from: ['/agency'],
                            to: ['/:page?'],
                            containers: ['#agency', '#scroll'],
                            name: 'close-modal',
                        },
                        {
                            from: ['/highlights'],
                            to: ['/:page?'],
                            containers: ['#highlights', '#scroll'],
                            name: 'close-modal',
                        },
                    ]
                })
            ]
        });

        load.hooks.before('content:replace', async (visit) => {
            console.log('before content replace:', visit);

            for(let container of visit.containers) {
                const oldContainer = this.el.querySelector(container)
                console.log('old container: ', oldContainer)
                this.call('destroy', oldContainer, 'app');

            }
        });

        load.hooks.on('content:replace', (visit) => {
            console.log('On content replace:', visit);

            if(visit.fragmentVisit) {
                if(visit.fragmentVisit.name == 'open-modal') {
                    // this.call('populate', document.getElementById('modal'), 'Dialog');
                    // this.call('show', null, 'Dialog')
                    // setTimeout(() => {

                    body.classList.add('is-modal-active')

                    console.log(getComputedStyle(document.getElementById('agency')).getPropertyValue('--duration-in'));
                    setTimeout(() => {
                        this.call('update', null, 'Scroll')
                        console.log('init')
                    }, getComputedStyle(document.getElementById('agency')).getPropertyValue('--duration-in'));
                        
                    // }, 750)
                } else if(visit.fragmentVisit.name == 'close-modal') {
                    // this.call('close', null, 'Dialog')
                    body.classList.remove('is-modal-active')
                }
            }

            for(let container of visit.containers) {
                const newContainer = this.el.querySelector(container)
                console.log('new container: ', newContainer)
                newContainer.classList.add('transition-fade')
                this.call('update', newContainer, 'app');
            }
        });

        console.log(this, load);
    }
}
