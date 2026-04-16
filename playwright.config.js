// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40*1000,// for every step
  expect:{
    timeout: 40*1000, // for assertions
  },
  reporter : 'html',
  
  
  use: {
    browserName : 'chromium',
    headless : false

    
  },

  

    
  

  
    });

  module.exports = config; // so that it is available to other files across the project

