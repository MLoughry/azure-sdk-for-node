/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Definition of usage counter name.
 *
 */
class UsageCounterName {
  /**
   * Create a UsageCounterName.
   * @member {string} [value] Gets or sets the usage counter name.
   * @member {string} [localizedValue] Gets or sets the localized usage counter
   * name.
   */
  constructor() {
  }

  /**
   * Defines the metadata of UsageCounterName
   *
   * @returns {object} metadata of UsageCounterName
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'UsageCounterName',
      type: {
        name: 'Composite',
        className: 'UsageCounterName',
        modelProperties: {
          value: {
            required: false,
            serializedName: 'value',
            type: {
              name: 'String'
            }
          },
          localizedValue: {
            required: false,
            serializedName: 'localizedValue',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = UsageCounterName;
