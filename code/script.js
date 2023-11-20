// A function that adds and remove the class "active" on the section you click on.
function toggle(e) {
  const element = e.target;
  element.classList.toggle("active");
}

// Selects and HTML element, and calls a function which will be executed when the element is clicked.
const sectionElements = document.querySelectorAll(".section");

sectionElements.forEach((sectionElement) => {
  sectionElement.addEventListener("click", toggle);
});

//HTML Element where data should be inserted
const faqElement = document.getElementById("accordion");

//Download data with fetch
const responsePromise = fetch("https://jsonplaceholder.typicode.com/posts");

const dataPromise = responsePromise.then((response) => {
  return response.json();
});

dataPromise.then((data) => {
  console.log(data);

  //Make first letter in sentence capital
  function capsFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  //Adding divs from fetch data array
  data.forEach((faqItem) => {
    //title property
    const faqTitle = document.createElement("div");
    faqTitle.textContent = faqItem.title;

    faqElement.appendChild(faqTitle);
    faqTitle.classList.add("title", "section");

    //Creating arrow icon element
    const arrowDown = document.createElement("i");
    arrowDown.classList.add("fa-solid", "fa-angle-down", "icon");
    faqTitle.innerHTML = `${arrowDown.outerHTML} ${capsFirst(faqItem.title)}`;

    const arrowIcons = faqElement.querySelectorAll(".fa-angle-down");

    //Listen for click on arrows
    arrowIcons.forEach((arrowIcon) => {
      if (!arrowIcon.hasEventListener) {
        arrowIcon.addEventListener("click", () => {
          faqTitle.classList.toggle("active");
          arrowIcon.classList.toggle("rotated");
          console.log("click");
        });

        arrowIcon.hasEventListener = true;
      }
    });

    //body property
    const faqBody = document.createElement("div");
    faqBody.textContent = capsFirst(faqItem.body);

    faqElement.appendChild(faqBody);
    faqBody.classList.add("description");

    faqTitle.addEventListener("click", toggle);
  });
});
