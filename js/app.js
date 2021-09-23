const PERCENT_REVEAL_SECTION = 0.2;

///////////////////////////////////////////////////////////
// Sticky navigation

const headerEl = document.querySelector(".header");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting) document.body.classList.remove("sticky");

    if (!ent.isIntersecting) document.body.classList.add("sticky");

    headerEl.classList.toggle("nav-header--mobile");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-90px",
  }
);

obs.observe(headerEl);

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    //Scrool back to Top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

///////////////////////////////////////////////////////////
// Reveal sections

const allSectionsEl = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: PERCENT_REVEAL_SECTION,
});

allSectionsEl.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
///////////////////////////////////////////////////////////
// Mobile Nav
const btnMobileNavEl = document.querySelector(".btn-mobile-nav");
const mainNavEl = document.querySelector(".main-nav");

btnMobileNavEl.addEventListener("click", function (e) {
  e.preventDefault();
  mainNavEl.classList.toggle("nav-open");
});

//Close Mobile Nav when click on a Link
const listNavLinksEl = document.querySelector(".list");
listNavLinksEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("link"))
    mainNavEl.classList.remove("nav-open");
});

///////////////////////////////////////////////////////////
// Set Year
document.querySelector(".year").textContent = new Date().getFullYear();
