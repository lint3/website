var container = document.getElementById('query-builder-container');
var rootGroup = createLogicalGroup('and');
rootGroup.setAttribute('draggable', 'false');
container.appendChild(rootGroup);

let dragged;

function createLogicalGroup(logicType) {
    var group = createDraggable(true);
    var typeSwitcher = document.createElement('select');
    typeSwitcher.setAttribute('class', 'logic-type-switcher');
    // TODO: Add logic type switcher
    group.appendChild(createAddForm());
    group.classList.add('logical');
    group.classList.add(logicType);
    return group;
}

function createRequirement(reqType) {
    // TODO: Add requirement type switcher
    var req = createDraggable(false);
    req.classList.add('requirement-' + reqType);
    req.appendChild(createTagForm());
    return req;
}

function createAddForm() {
    var formDiv = document.createElement('div');
    formDiv.classList.add('add-form');
    
    var newReqButton = document.createElement('input');
    newReqButton.setAttribute('type', 'button');
    newReqButton.setAttribute('value', '+Req');
    newReqButton.addEventListener('click', (event) => {
        event.target.closest(".group").appendChild(createRequirement('tag'));
    });
    
    var newLogicButton = document.createElement('input');
    newLogicButton.setAttribute('type', 'button');
    newLogicButton.setAttribute('value', '+Grp');
    newLogicButton.addEventListener('click', (event) => {
        event.target.closest(".group").appendChild(createLogicalGroup('or'));
    });
    
    formDiv.appendChild(newReqButton);
    formDiv.appendChild(newLogicButton);
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
    formDiv.appendChild(valueBox);
    
    return formDiv;
}





function parseStructureToQueryString(group, depth) {
    var queryString = "";
    
    // Base: Tag requirement
    if (group.classList.contains('requirement-tag')) {
        queryString += parseRequirementTag(group);
    } else if (group.classList.contains('requirement-example')) {
        // pass
    }
    
    return queryString;
}
    
function parseRequirementTag(group) {
    var result = "";
    // TODO: nwr
    result += 'nwr["' + group.querySelector('input[name="key"]') + '"';
    // TODO: Equality type
    result += '=';
    result += '"' + group.querySelector('input[name="value"]') + '"' + ']';
    
    return result;
}