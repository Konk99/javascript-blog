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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {
  console.log(customSelector);
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  console.log("TitleLinks",titleList);
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {

    /* find tags wrapper */
    const articleWrapper = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const articleTagArray = articleTags.split(' ');
    
    /* START LOOP: for each tag */
    for (let tag of articleTagArray) {
      
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</a>&nbsp&nbsp</span></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* END LOOP: for each tag */
    }

    /* insert HTML fo the links into the tags wrapper */
    articleWrapper.innerHTML = html;

    /* END LOOP: for every article */
  }
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  console.log(href);

  const tag = href.replace('#tag-', '');

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activetag of activeTags) {
    activetag.classList.remove('active');
  }

  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');

  for (let hrefTag of hrefTags) {
    hrefTag.classList.add('active');
  }
  
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const taglinks = document.querySelectorAll('[href*="#tag-"]')

  for (let taglink of taglinks) {
    taglink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

const optPostAuthor = '.post-author';

function generateAuthor() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector(optPostAuthor);

    let html = '';

    const articleAuthor = article.getAttribute('data-author');
    
    const linkHtml = '<a href=#' + articleAuthor + '><span>' + articleAuthor + '</a></span>';

    html = html + linkHtml;

    authorWrapper.innerHTML = html;

  }

}

generateAuthor();

function addClickListenersToAuthor() {
  const authorLinks = document.querySelectorAll('.post .post-author a');
  console.log('AuthorLinks', authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  console.log('AuthorHref', href);

  const author = href.replace('#', '');
  console.log('author', author);

  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');

  for (let hrefTag of hrefTags) {
    hrefTag.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

addClickListenersToAuthor();
