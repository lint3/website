var container = document.getElementById('query-builder-container');
var rootGroup = createLogicalGroup();
rootGroup.setAttribute('draggable', 'false');
rootGroup.getElementsByClassName('delete-button')[0].remove();
container.appendChild(rootGroup);

let dragged;

function createLogicalGroup() {
    var group = createDraggable(true);
    var typeSwitcher = document.createElement('select');
    typeSwitcher.setAttribute('class', 'logic-type-switcher');
    var opts = ['or', 'and', 'not'];
    var opt_titles = ['Or', 'And (todo)', 'Not (todo)'];
    for (var i = 0; i < opts.length; i++) {
        var opt = document.createElement('option');
        opt.value = opts[i];
        opt.text = opt_titles[i];
        typeSwitcher.appendChild(opt);
    }
    group.appendChild(typeSwitcher);
    typeSwitcher.addEventListener('change', (event) => {
        for (var i = 0; i < opts.length; i++) {
            event.target.closest('.group').classList.remove(opts[i]);
        }
        event.target.closest('.group').classList.add(event.target.value);
        updateQuery();
    });
    
    group.appendChild(createMgmtForm(true));
    group.classList.add('group-logical');
    group.classList.add('or');
    return group;
}

function createRequirement() {
    // TODO: Add requirement type switcher
    var req = createDraggable(false);
    req.classList.add('requirement');
    
    var typeSwitcher = document.createElement('select');
    typeSwitcher.setAttribute('class', 'requirement-type-switcher');
    var opts = ['tag-content', 'tag-regex', 'bbox', 'num-tags', ];
    var opt_titles = ['Tag Content', 'Tag Regex (todo)', 'Within Bbox (todo)', 'Tag Count (todo)'];
    for (var i = 0; i < opts.length; i++) {
        var opt = document.createElement('option');
        opt.value = opts[i];
        opt.text = opt_titles[i];
        typeSwitcher.appendChild(opt);
    }
    req.appendChild(typeSwitcher);
    typeSwitcher.addEventListener('change', (event) => {
        for (var i = 0; i < opts.length; i++) {
            event.target.closest('.group').classList.remove(opts[i]);
        }
        event.target.closest('.group').classList.add(event.target.value);
        updateQuery();
    });
    
    req.appendChild(createMgmtForm(false));
    req.appendChild(createTagForm());
    return req;
}

function createMgmtForm(childrenOk) {
    var formDiv = document.createElement('div');
    formDiv.classList.add('add-form');
    
    if (childrenOk) {
        var newReqButton = document.createElement('input');
        newReqButton.setAttribute('type', 'button');
        newReqButton.setAttribute('value', '☑️');
        newReqButton.setAttribute('title', 'Add requirement');
        newReqButton.classList.add('new-requirement-button');
        newReqButton.addEventListener('click', (event) => {
            event.target.closest(".group").appendChild(createRequirement());
            updateQuery();
        });
        
        var newLogicButton = document.createElement('input');
        newLogicButton.setAttribute('type', 'button');
        newLogicButton.setAttribute('value', '🔲');
        newLogicButton.setAttribute('title', 'Add group');
        newLogicButton.classList.add('new-logic-button');
        newLogicButton.addEventListener('click', (event) => {
            event.target.closest(".group").appendChild(createLogicalGroup());
            updateQuery();
        });
        
        formDiv.appendChild(newReqButton);
        formDiv.appendChild(newLogicButton);
    }
    
    var deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', '🗑️');
    deleteButton.setAttribute('title', 'Delete this');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', (event) => {
        event.target.closest(".group").parentNode.removeChild(event.target.closest(".group"));
        updateQuery();
    });
    

    formDiv.appendChild(deleteButton);
    return formDiv;
}

function createTagForm() {
    
    var formDiv = document.createElement('div');
    formDiv.classList.add('tag-form');
    
    var nwrSelector = document.createElement('span');
    nwrSelector.textContent = 'nwr ';
    nwrSelector.classList.add('tag-nwr-selector');
    formDiv.appendChild(nwrSelector);
    
    var keyBox = document.createElement('input');
    keyBox.setAttribute('type', 'text');
    keyBox.setAttribute('name', 'key');
    keyBox.classList.add('tag-key-input');
    keyBox.setAttribute('size', '20');
    keyBox.addEventListener('input', (event) => {
        updateQuery();
    });
    formDiv.appendChild(keyBox);
    
    var equalitySelector = document.createElement('span');
    equalitySelector.classList.add('tag-equality-selector');
    equalitySelector.textContent = ' = ';
    formDiv.appendChild(equalitySelector);
    
    var valueBox = document.createElement('input');
    valueBox.setAttribute('type', 'text');
    valueBox.setAttribute('name', 'value');
    valueBox.classList.add('tag-value-input');
    valueBox.setAttribute('size', '20');
    valueBox.addEventListener('input', (event) => {
        updateQuery();
    });
    formDiv.appendChild(valueBox);
    
    return formDiv;
}


let query = new QuerySubstring(0);
let queryPrefix = new QuerySubstring(0);
let querySuffix = new QuerySubstring(0);

var buildButton = document.getElementById("build-query-button");
var resultsArea = document.getElementById("query-results");

function updateQuery() {
    query.clear();
    queryPrefix.clear();
    querySuffix.clear();
    checkPrefixOptions(queryPrefix);
    checkSuffixOptions(querySuffix);
    parseStructureToQueryString(rootGroup, query);
    resultsArea.textContent = queryPrefix.result + query.result + querySuffix.result;
}

buildButton.addEventListener('click', (event) => {
    updateQuery();
});