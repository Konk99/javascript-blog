'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all acrticle links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    console.log('clickedElement:', targetArticle);
    targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ' ';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {

        /* get the atricle id */
        const articleId = article.getAttribute('id');

        /* find title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* get the title from the title element */
         

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        
        /* insert link into titleList */
        html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();    

const optArticleTagsSelector = '.post-tags .list'

function generateTags() {
  /* find all articles */
  const articles = document.querrySelectorAll(optArticleTagsSelector);

  /* START LOOP: for every article */
  for (let article of articles) {

    /* find tags wrapper */
    const articleWrapper = article.querrySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html += linkHTML;

      /* END LOOP: for each tag */
    }

    /* insert HTML fo the links into the tags wrapper */
    articleWrapper.innerHTML = html;

    /* END LOOP: for every article */
  }
}
