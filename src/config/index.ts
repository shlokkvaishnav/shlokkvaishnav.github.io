/**
 * Centralized Config Export
 * Single import point for all configuration
 */

import { siteConfig, type SiteConfig } from './site.config'
import { contentConfig, type ContentConfig } from './content.config'
import { themeConfig, type ThemeConfig } from './theme.config'

export { siteConfig, contentConfig, themeConfig }
export type { SiteConfig, ContentConfig, ThemeConfig }

// Helper function to get all configs
export const getAllConfig = () => ({
  site: siteConfig,
  content: contentConfig,
  theme: themeConfig
})
