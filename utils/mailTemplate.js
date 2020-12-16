const { clientUrl } = require('../configs');

exports.template = keyword => {
  const content = keyword ?
    `Aren't you curious about ${keyword} perfumes?` :
    'Find various perfumes!';

  const url = keyword ?
    `${clientUrl}/?keyword=${keyword}` :
    `${clientUrl}`;

  return `
    <div
      style="
        width: 100%;
        margin: 0 auto;
        padding-top: 18px;
        padding-bottom: 42px;
        font-family: serif;
        font-weight: bold;
        background: #FFF6F0;
      "
    >
      <h1 style="text-align: center;">Metafume</h1>
      <p style="text-align: center; font-size: 18px; margin-bottom: 32px;">
        ${content}
      </p>
      <a
        href=${url}
        style="
          display: block;
          margin: 0 auto;
          width: 160px;
          padding: 16px 32px;
          text-align: center;
          background-color: black;
          color: white;
          text-decoration: none;
        "
      >
        Go to Metafume
      </a>
    </div>
  `;
};
