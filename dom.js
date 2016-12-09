var data = getGeneratedData(),
    dataLen = data.length,
    rootEl = document.querySelector('#root'),
    globalElArray = [],
    listEl = document.querySelector("#list"),
    listElRect = listEl.getBoundingClientRect(),
    listFragmentDom,lastElIndex;

function getGeneratedData(){
  var data = [];
  for(var i=0; i<100; i++) data.push(i+1)
  return data
}

function createEls(from,to,list){
  listFragmentDom = document.createDocumentFragment()
  var tempEl;
  for(var i=from; i<to; i++){
    if(globalElArray[i]){
      tempEl = globalElArray[i]
    }
    else {
      tempEl = document.createElement('li')
      tempEl.innerText = list[i]
      tempEl.classList.add('list-el')
    }
    listFragmentDom.appendChild(tempEl)
  }
  listEl.appendChild(listFragmentDom)
  lastElIndex = to
}


function updateData(from,to,list){
  removeEls()
  createEls(from,to,list)
}

function removeEls(){
  var childrens = Array.from(listEl.children),
      len = childrens.length;
  if(len === 0 ) return;
  for(var i=0; i<len; i++){
    listEl.removeChild(childrens[i])
  }
}
updateData(0,12,data)

listEl.addEventListener('scroll', function(){
  var firstChildRect = listEl.firstChild.getBoundingClientRect(),
      lastChildRect = listEl.lastChild.getBoundingClientRect(),
      idx;
  
  
  if(lastElIndex < dataLen && lastChildRect.bottom <= listElRect.bottom){
    idx = lastElIndex+12
    // reached bottom
    if(idx > dataLen-1){
      idx = dataLen
    }
    createEls(lastElIndex,idx,data)
  }
})