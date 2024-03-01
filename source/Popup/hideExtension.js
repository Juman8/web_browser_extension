const elementsToHide = ['#my-extension-element', '.my-extension-class'];

elementsToHide.forEach((element) => {
  document.querySelector(element).style.display = 'none';
});