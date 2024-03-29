class QuerySubstring {
    constructor() {
        this._s = '';
        this._depth = 0;
    }
    get result() {
        return this._s;
    }
    
    add(line) {
        this._s += ('    '.repeat(this._depth)) + line;
    }
    
    addLine(line) {
        if (line === undefined) {
            this._s += '\n';
        } else {
            this._s += ('    '.repeat(this._depth)) + line + '\n';
        }
    }
    
    addLineIndent(line) {
        this.increaseDepth();
        this.addLine(line);
        this.decreaseDepth();
    }
    
    increaseDepth() {
        this._depth += 1;
    }
    
    decreaseDepth() {
        this._depth -= 1;
    }
    
    clear() {
        this._depth = 0;
        this._s = '';
    }
}
    
function checkPrefixOptions(q) {
    let outputFormat = document.getElementById('output-format-selector').value;
    let timeoutLength = document.getElementById('timeout-selector').value;
    let bboxType = document.getElementById('global-bbox-selector').value;
    
    if (outputFormat == 'json') {
        q.add('[out:json]');
    } else if (outputFormat == 'csv') {
        q.add('[out:csv]');
    } else {
        // pass
    }
    
    if (timeoutLength != 0) {
        q.add('[timeout:' + timeoutLength + ']');
    } else {
        // q.addLine();
    }
    
    if (bboxType == 'none') {
        // pass
    } else if (bboxType == 'bbox') {
        q.add('[bbox:{{bbox}}]');
    } else {
        
    }
    
    q.addLine(';');
        
}

function checkSuffixOptions(q) {
    let outputType = document.getElementById('output-type-selector').value;
    
    if (outputType == 'plain') {
        q.addLine('out body; >; out skel qt;');
    } else if (outputType == 'centers') {
        q.addLine('out center;');
    }
}

function parseStructureToQueryString(group, q) {
    
    // Bases: Requirements
    if (group.classList.contains('requirement')) {
        q.addLine(parseRequirementTag(group));
    } else if (group.classList.contains('requirement-some-other-example')) {
        // pass
    }
    
    // Recurse: Group
    if (group.classList.contains('group-logical')) {
        
        if (group.classList.contains('and')) {
            // todo
        } else if (group.classList.contains('or')) {
            q.addLine('(');
            q.increaseDepth();
            for (child of group.children) {
                parseStructureToQueryString(child, q);
            }
            q.decreaseDepth();
            q.addLine(');');
        } else if (group.classList.contains('not')) {
            // todo
        }
        q.increaseDepth();

        
    } else if (group.classList.contains('group-some-other-example')) {
        // pass
    }
}

function parseRequirementTag(group) {
    var result = "";
    // TODO: nwr
    result += 'nwr["' + group.querySelector('input[name="key"]').value + '"';
    // TODO: Equality type
    result += '=';
    result += '"' + group.querySelector('input[name="value"]').value + '"' + '];';
    
    return result;
}