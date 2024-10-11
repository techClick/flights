let isShowingMenu = false;

export const moveSideBar = function moveSideBar(removeOnly: boolean) {
  const sideBar = document.getElementById('sideBar');
  if (sideBar) {
    const sideBarStyle = window.getComputedStyle(sideBar);
    if (isShowingMenu) {
      sideBar.style.transition = 'all ease-in 250ms';
      sideBar.style.left = sideBarStyle.width;
      sideBar.style.left = '-100%';
      isShowingMenu = !isShowingMenu;
      return;
    }
    if (!removeOnly) {
      sideBar.style.transition = 'all ease-out 250ms';
      sideBar.style.left = '0px';
      sideBar.style.left = sideBarStyle.width;
      isShowingMenu = !isShowingMenu;
    }
  }
};
