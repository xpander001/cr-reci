import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const RecipeTemplate = ({
  content,
  contentComponent,
  description,
  ingredients,
  makes,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {ingredients && ingredients.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Ingredients</h4>
                <ul>
                  {ingredients.map(ingredient => (
                    <li key={ingredient + `ingredient`}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <h4>Makes</h4>
            <p>{makes}</p>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

RecipeTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Recipe = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <RecipeTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | Blog"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        makes={post.frontmatter.makes}
        ingredients={post.frontmatter.ingredients}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

RecipeTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Recipe

export const pageQuery = graphql`
  query RecipeByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        ingredients
        makes
      }
    }
  }
`
