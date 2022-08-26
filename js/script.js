// prealoader
$(document).ready(() => {
  $('#preloader').fadeOut();
});

// back to top
$('.back-to-top').click(() => {
  window.scrollTo(0, 0);
});

// back to top
$('.back-to-top').click(() => {
  window.scrollTo(0, 0);
});

// nav toggle
$('.toggle-btn').click(() => {
  $('.header').toggleClass('header-toggle-active');
});

$(window)
  // remove nav toggle when resized
  .resize(() => {
    $('.header').removeClass('header-toggle-active');
  })
  // sticky header when scroll
  .scroll(() => {
    if (scrollY > 150) {
      $('.back-to-top').fadeIn();
      $('.header').addClass('header-scroll-active');
    } else {
      $('.back-to-top').fadeOut();
      $('.header').removeClass('header-scroll-active');
    }
    // remove mouse animation when scroll
    if (scrollY > 250) {
      $('.mouse-scroll-animation').fadeOut();
    } else {
      $('.mouse-scroll-animation').fadeIn();
    }
  });

const Request = 'https://sam4web.github.io/info_data/data.json';

fetch(Request)
  .then((res) => res.json())
  .then((data) => {
    // get skill and projects data form "data.json"
    loadProjects(data.projects);
    loadSkills(data.skills);
    loadSocialLinks(data.social);
  });

// generate and load skillTemplate in class ".skill-container"
const loadSkills = (skills) => {
  let skillTemplate = '';
  skills.forEach((skill) => {
    skillTemplate += `
      <li class="skill"> ${skill} </li>
      `;
  });
  $('.skill-container').html(skillTemplate);
};

// generate and load projectTemplate in class ".project-container"
const loadProjects = (projects) => {
  let projectTemplate = '';
  projects.forEach((project, index) => {
    if (index >= 4) return;
    projectTemplate += `\n
    <div class='project-item'>
    <div class='project-item__image'>
    <img src='${project.imageLink}' alt='${project.name}' />
    <ul>
    <li title='source code'>
    <a target='_blank' href='${project.sourceCode}'>
    <i class='fa-solid fa-code'></i>
    </a>
    </li>
    ${
      'livePreview' in project
        ? `
      <li title="live site">
      <a target="_blank" href="${project.livePreview}">
      <i class="fa-solid fa-eye"></i>
      </a>
      </li>`
        : ''
    }
    </ul>
    </div>
    <h3 class='project-item__title'>
    <a
    href="${
      'livePreview' in project ? project.livePreview : project.sourceCode
    }"
    target='_blank'
    >
    ${project.name}
    </a>
    </h3>
    </div>
    <!-- / project item -->
    \n`;
  });
  $('.project-container').html(projectTemplate);
};

// generate and load social links in class ".social-list"
const loadSocialLinks = (socials) => {
  let socialLinkTemplate = '';
  socials.forEach((social) => {
    socialLinkTemplate += `
    <li class="social-item">
      <a href="${social.link}" target="_blank">
        <i class="${social.icon}"></i>
      </a>
    </li>
    `;
  });
  $('.social-list').html(socialLinkTemplate);
};
