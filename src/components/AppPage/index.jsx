import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const AppPage = ({
  title,
  description,
  children,
  className,
}) => (
  <main className={`AppPage ${className}`}>
    <Helmet>
      <title>{title}</title>

      {description && (
        <meta name="description" content={description} />
      )}

      <meta name="image" content="https://goalmag.herokuapp.com/logo.svg" />

      {/* <!-- Schema.org for Google --> */}
      <meta itemProp="name" content={`${title} - Goal Magazine`} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content="https://goalmag.herokuapp.com/logo.svg" />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title} - Goal Magazine`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@vadymshymko" />
      <meta name="twitter:creator" content="@vadymshymko" />
      <meta name="twitter:image:src" content="https://goalmag.herokuapp.com/logo.svg" />

      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta name="og:title" content={`${title} - Goal Magazine`} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content="https://goalmag.herokuapp.com/logo.svg" />
      <meta name="og:url" content="https://goalmag.herokuapp.com" />
      <meta name="og:site_name" content="Goal Magazine" />
      <meta name="og:locale" content="en_US" />
      <meta name="fb:admins" content="1234567890" />
      <meta name="fb:app_id" content="1234567890" />
      <meta name="og:type" content="website" />
    </Helmet>

    {children}
  </main>
);

AppPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

AppPage.defaultProps = {
  className: '',
  title: '',
  description: PropTypes.string,
  children: null,
};

export default AppPage;
