/*************** year range ***************/
const yearRange = document.getElementById('yearRange');
const fyear = (new Date()).getFullYear();

yearRange.innerText += (fyear == '2025' ? '' : `-${fyear}`);
