import React from 'react'
import PropTypes from 'prop-types'
import { RecipeTemplate } from '../../templates/recipe'

const RecipePreview = ({ entry, widgetFor }) => (
  <RecipeTemplate
    content={widgetFor('description')}
    ingredients={entry.getIn(['data', 'ingredients'])}
    makes={entry.getIn(['data', 'makes'])}
    summary={entry.getIn(['data', 'summary'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

RecipePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RecipePreview
