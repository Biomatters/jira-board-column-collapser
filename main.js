/**
 * Jira board column collapser.
 *
 * Hides empty columns on boards in Jira
 */
let grid;
let TIME = 1000;

function init() {
    grid = document.querySelector('div#ghx-pool');
    if (grid) {
        if (headers().length > 1) {
            setInterval(updateUi, TIME);
        }
        else {
            setTimeout(init, TIME);
        }
    }
    else {
        error('No grids');
    }
}

function updateUi() {
    headers().forEach(header => {
        let id = header.dataset.id;
        let display = (issues(id).length < 1) ? 'none' : '';

        header.style.display = display;
        cells(id).forEach(cell => cell.style.display = display);
    });
}

function headers() {
    return select('ul.ghx-column-headers > li.ghx-column');
}

function cells(id, suffix = '') {
    return select(`div.ghx-swimlane > ul.ghx-columns > li.ghx-column[data-column-id="${id}"] ${suffix}`);
}

function issues(id) {
    return cells(id, '> *');
}

function select(query) {
    return Array.prototype.slice.call(grid.querySelectorAll(query));
}

function error(message) {
    console.error('Jira board column collapser:', message);
}

chrome.extension.sendMessage({}, init);
