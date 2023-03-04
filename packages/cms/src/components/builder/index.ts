/**
 * Components to build:
 * - Builder UI / Editor
 * - Preview Mode
 * ---------------------------------
 * - Accordion
 * - Tabs
 * - Modal
 * - Popover
 * - Carousel
 * - Lightbox
 * - Text block (with rich text editor)
 * - Image
 * - Video
 * - Audio
 * - Media Gallery
 * - Button
 * - Social Links / Share
 * - Menu
 * - Code
 */

/**
 * Component Design API
 *
 * CMS components are registered with the CMS and can be used in the builder. By following the
 * design API, the CMS can render the component in the builder and in the preview mode. Developers
 * can also use the design API to build their own components.
 *
 * - Component (rendered)
 * - Type (e.g. the shape of the data)
 * - Data Form (e.g. form schema for editing the data)
 * - Settings Form (e.g. form schema for editing the component settings)
 */

// Need to define the data schema for the component
interface Component<T> {
  id: string
  name: string
  description: string
  type: T
  fields: FieldProps[]
  settings: [{ name: string; fields: FieldProps[] }]
}
