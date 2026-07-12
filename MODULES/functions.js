exports.add = function(a,b){
    return a + b ; 
}

exports.sub = function(a,b){
    return b-a ; 
}

exports.mul = function(a,b){
    return a * b ; 
}

exports.div= function(a,b){
    return b/a ; 
}

module.exports = function(name = 'Shubham'){
    console.log(`Hey ${name} , Welcome to Default Modules`) ; 
}