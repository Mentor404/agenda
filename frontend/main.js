import './assets/css/style.css';

const actionButtons = document.querySelectorAll('.action-button');

actionButtons.forEach(button => {
  const popoverContainer = button.parentElement.querySelector('.popover');

  button.onclick = () => {
    document.querySelectorAll('.popover').forEach(popover => {
      if (popover !== popoverContainer) {
        popover.classList.add('hidden');
        popover.classList.remove('flex');
      }
    });

    popoverContainer.classList.toggle('hidden');
    popoverContainer.classList.toggle('flex');
    console.log('click');
  };
});
