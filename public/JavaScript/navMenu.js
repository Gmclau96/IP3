/* Nav Menu display handling */
  const hamburger = document.getElementById("burger-menu");
  const navContent = document.getElementById("nav-content");
  const navMenu = document.getElementsByClassName("nav-menu");

  //Display & Hide Nav Menu
  hamburger.addEventListener("click", () => {
      if (navContent.style.display !== "none") {
        navContent.style.display = "none";
        } else {
          navContent.style.display = "block";
          navMenu.style.backgroundColor = "black";
        }
      });
    