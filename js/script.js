'use strict';

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  postAuthor: '.post-author',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors',
};

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all acrticle links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
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

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}





function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the atricle id */
    const articleId = article.getAttribute('id');

    /* find title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

    /* get the title from the title element */


    /* create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {};
  params.max = 0;
  params.min = 999999;

  for (let tag in tags) {

    params.max = Math.max(tags[tag], params.max);

    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

  return classNumber;
}

function generateTags() {
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {

    /* find tags wrapper */
    const articleWrapper = article.querySelector(opt.articleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagArray) {

      /* generate HTML of the link */
      const linkHTMLData = { tag: tag };
      const linkHTML = templates.tagsLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML fo the links into the tags wrapper */
    articleWrapper.innerHTML = html;

    /* END LOOP: for every article */
  }

  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  const allTagsData = { tags: [] };

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });

    // allTagsHTML += '<li><a class="'+ opt.cloudClassPrefix + calculateTagClass(allTags[tag],tagsParams)+'" href="#tag-' + tag + '">'+tag+'</a></li>'/*( + allTags[tag] + )*/;
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  // tagList.innerHTML = allTagsHTML;
  //  console.log(allTags);
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

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



function generateAuthor() {
  const articles = document.querySelectorAll(opt.articleSelector);

  let allAuthors = {};

  for (let article of articles) {
    const authorWrapper = article.querySelector(opt.postAuthor);

    let html = '';

    const articleAuthor = article.getAttribute('data-author');

    const linkHTMLData = { author: articleAuthor };
    const linkHtml = templates.authorLink(linkHTMLData);

    html = html + linkHtml;

    authorWrapper.innerHTML = html;

    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

  }

  const AuthorList = document.querySelector(opt.authorsListSelector);

  const authorsParams = calculateTagsParams(allAuthors);

  const allAuthorsData = { authors: [] };
  // let allAuthorsHTML = '';

  for (let author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorsParams),
    });
    // allAuthorsHTML += '<li><a class="'+ opt.cloudClassPrefix+ calculateTagClass(allAuthors[author],authorsParams)+'"href="#tag-' + author + '">' + author + '</a></li>'/*( + allAuthors[author] + )*/;
  }

  AuthorList.innerHTML = templates.authorCloudLink(allAuthorsData);

  /* AuthorList.innerHTML = allAuthorsHTML;
   console.log(allAuthors);*/

}

generateAuthor();

function addClickListenersToAuthor() {
  const authorLinks = document.querySelectorAll('[href*="#aut-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(event) {
  event.preventDefault();
  const href = this.getAttribute('href');

  const author = href.replace('#aut-', '');

  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');

  for (let hrefTag of hrefTags) {
    hrefTag.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

addClickListenersToAuthor();

