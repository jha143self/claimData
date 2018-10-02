function regExpFromString(q) {
   
  try { return new RegExp(pattern, flags); } catch (e) { return null; }
}

console.log(regExpFromString('\\bword\\b'));
