let timer = null
function debounce(fn, delay = 300){
  if(timer !== null) clearTimeout(timer)
  timer = setTimeout(fn, delay)
}

export default debounce
