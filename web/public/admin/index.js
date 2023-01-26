import CMS from 'netlify-cms-app'
import {
  ImageDimensionsControl,
  ImageDimensionsPreview,
  ImageDimensionsSchema,
} from 'netlify-cms-widget-image-dimensions'
// Initialize the CMS object
CMS.init()
// Now the registry is available via the CMS object.
// CMS.registerPreviewTemplate('my-template', MyTemplate)
CMS.registerWidget(
  'image_dimensions',
  ImageDimensionsControl,
  ImageDimensionsPreview,
  ImageDimensionsSchema
)
