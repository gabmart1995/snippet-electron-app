/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.39.0(ff3621a3fa6389873be5412d17554294ea1b0941)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/bat/bat.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "bat",
  extensions: [".bat", ".cmd"],
  aliases: ["Batch", "bat"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/bat/bat"], resolve, reject);
      });
    } else {
      return import("./bat.js");
    }
  }
});
