/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {sh} = require('@lib/utils/sh.js');
// const {DIST, PAGES_DEST} = require('@lib/utils/project').paths;
const {DIST, PAGES_DEST} = require('@lib/utils/project').paths;
const {NETLIFY_DEPLOY_TOKEN} = process.env;
const SITES = [
  {
    NAME: 'challangerdeep.netlify.app',
    ID: 'dff91c68-0a3a-4ccd-a5d5-ada619a2ed40',
    DIR: PAGES_DEST,
  },
  {
    NAME: 'playground-challangerdeep.netlify.app',
    ID: '71c6686d-ddf3-4be3-9f98-b716bd372a13',
    DIR: `${DIST}/playground`,
  },
  // {
  //   NAME: 'preview.amp.dev',
  //   ID: 'caf28d42-024a-4efb-b266-b00cf10847a3',
  //   DIR: `${DIST}/examples`,
  // },
];

async function staticDeploy() {
  for (const SITE of SITES) {
    console.log(`attempting to deploy ${SITE.DIR}`);

    // await sh(`netlify link`);
    await sh(
      `npx netlify deploy --prod --auth ${NETLIFY_DEPLOY_TOKEN} --site ${SITE.ID}`,
      {
        workingDir: SITE.DIR,
      }
    );
  }
}

exports.staticDeploy = staticDeploy;
